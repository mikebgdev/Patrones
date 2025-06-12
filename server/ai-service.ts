import OpenAI from "openai";
import { storage } from "./storage";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface PatternRecommendation {
  patternSlug: string;
  patternName: string;
  relevanceScore: number;
  reason: string;
  useCase: string;
}

export interface RecommendationRequest {
  projectDescription: string;
  preferredLanguages?: string[];
  preferredFrameworks?: string[];
  preferredArchitectures?: string[];
  experienceLevel?: 'beginner' | 'intermediate' | 'advanced';
  projectType?: string;
  teamSize?: string;
}

export async function getPatternRecommendations(
  request: RecommendationRequest
): Promise<PatternRecommendation[]> {
  try {
    // Get all available patterns from database
    const allPatterns = await storage.getAllPatterns();
    
    // Create a concise pattern summary for the AI
    const patternSummary = allPatterns.map(pattern => ({
      slug: pattern.slug,
      name: pattern.name,
      category: pattern.category,
      difficulty: pattern.difficulty,
      description: pattern.description,
      languages: pattern.languages,
      frameworks: pattern.frameworks,
      architectures: pattern.architectures,
      tags: pattern.tags
    }));

    const systemPrompt = `Eres un experto en patrones de diseño de software. Tu tarea es analizar descripciones de proyectos y recomendar los patrones de diseño más apropiados.

PATRONES DISPONIBLES:
${JSON.stringify(patternSummary, null, 2)}

INSTRUCCIONES:
1. Analiza la descripción del proyecto del usuario
2. Considera las preferencias de tecnología (lenguajes, frameworks, arquitecturas)
3. Considera el nivel de experiencia del usuario
4. Recomienda entre 3-5 patrones más relevantes
5. Asigna un score de relevancia (1-10) basado en qué tan útil sería el patrón
6. Proporciona una razón clara de por qué recomiendas cada patrón
7. Incluye un caso de uso específico para el contexto del proyecto

Responde ÚNICAMENTE con un JSON válido en este formato:
{
  "recommendations": [
    {
      "patternSlug": "slug-del-patron",
      "patternName": "Nombre del Patrón",
      "relevanceScore": 8,
      "reason": "Razón detallada de por qué este patrón es útil para este proyecto",
      "useCase": "Caso de uso específico en el contexto del proyecto"
    }
  ]
}`;

    const userPrompt = `DESCRIPCIÓN DEL PROYECTO:
${request.projectDescription}

PREFERENCIAS TÉCNICAS:
- Lenguajes preferidos: ${request.preferredLanguages?.join(', ') || 'Cualquiera'}
- Frameworks preferidos: ${request.preferredFrameworks?.join(', ') || 'Cualquiera'}
- Arquitecturas preferidas: ${request.preferredArchitectures?.join(', ') || 'Cualquiera'}
- Nivel de experiencia: ${request.experienceLevel || 'No especificado'}
- Tipo de proyecto: ${request.projectType || 'No especificado'}
- Tamaño del equipo: ${request.teamSize || 'No especificado'}

Por favor, analiza este proyecto y recomienda los patrones de diseño más apropiados.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3, // Lower temperature for more consistent recommendations
    });

    const result = JSON.parse(response.choices[0].message.content || '{"recommendations": []}');
    
    // Validate and filter recommendations to ensure they exist in our database
    const validRecommendations = result.recommendations
      .filter((rec: any) => 
        allPatterns.some(pattern => pattern.slug === rec.patternSlug)
      )
      .slice(0, 5); // Limit to 5 recommendations

    return validRecommendations;
  } catch (error) {
    console.error('Error getting pattern recommendations:', error);
    throw new Error('Failed to get pattern recommendations');
  }
}

export async function explainPatternChoice(
  patternSlug: string,
  projectContext: string
): Promise<string> {
  try {
    const pattern = await storage.getPatternBySlug(patternSlug);
    if (!pattern) {
      throw new Error('Pattern not found');
    }

    const systemPrompt = `Eres un experto en patrones de diseño de software. Explica por qué un patrón específico es útil para un proyecto dado.

Proporciona una explicación clara y práctica que incluya:
1. Cómo el patrón resuelve problemas específicos del proyecto
2. Beneficios concretos en el contexto dado
3. Consideraciones de implementación
4. Ejemplos prácticos de uso en este contexto

Mantén la explicación accesible para desarrolladores de nivel intermedio.`;

    const userPrompt = `PATRÓN: ${pattern.name}
DESCRIPCIÓN DEL PATRÓN: ${pattern.description}

CONTEXTO DEL PROYECTO: ${projectContext}

Explica por qué este patrón sería útil para este proyecto específico.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.5,
    });

    return response.choices[0].message.content || 'No se pudo generar una explicación.';
  } catch (error) {
    console.error('Error explaining pattern choice:', error);
    throw new Error('Failed to explain pattern choice');
  }
}