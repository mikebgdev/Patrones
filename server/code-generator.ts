import OpenAI from "openai";
import type { Pattern } from "@shared/schema";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface GeneratedCode {
  code: string;
  explanation: string;
}

export async function generateCodeSnippet(
  pattern: Pattern, 
  language: string, 
  context: string
): Promise<GeneratedCode> {
  const prompt = `
Genera un ejemplo de código para el patrón de diseño "${pattern.name}" en ${language}.

Contexto del proyecto: ${context}

Descripción del patrón: ${pattern.description}

Requisitos:
1. El código debe ser funcional y seguir las mejores prácticas de ${language}
2. Incluye comentarios explicativos en español
3. Adapta el ejemplo al contexto específico del proyecto
4. Usa nombres de variables y clases relevantes al contexto
5. El código debe ser completo y ejecutable

Responde en formato JSON con esta estructura:
{
  "code": "código completo aquí",
  "explanation": "explicación detallada del código y cómo implementa el patrón"
}
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: "Eres un experto en patrones de diseño y programación. Genera código limpio, bien documentado y funcional."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 2000
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      code: result.code || "// Error al generar código",
      explanation: result.explanation || "No se pudo generar una explicación"
    };
  } catch (error) {
    console.error("Error generating code:", error);
    throw new Error("Failed to generate code snippet");
  }
}