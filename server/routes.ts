import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getPatternRecommendations, explainPatternChoice, type RecommendationRequest } from "./ai-service";
import { generateCodeSnippet } from "./code-generator";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all patterns
  app.get("/api/patterns", async (req, res) => {
    try {
      const patterns = await storage.getAllPatterns();
      res.json(patterns);
    } catch (error) {
      res.status(500).json({ message: "Error fetching patterns" });
    }
  });

  // Get pattern by slug
  app.get("/api/patterns/:slug", async (req, res) => {
    try {
      const pattern = await storage.getPatternBySlug(req.params.slug);
      if (!pattern) {
        return res.status(404).json({ message: "Pattern not found" });
      }
      res.json(pattern);
    } catch (error) {
      res.status(500).json({ message: "Error fetching pattern" });
    }
  });

  // Get patterns by category
  app.get("/api/patterns/category/:category", async (req, res) => {
    try {
      const patterns = await storage.getPatternsByCategory(req.params.category);
      res.json(patterns);
    } catch (error) {
      res.status(500).json({ message: "Error fetching patterns by category" });
    }
  });

  // Get all architectures
  app.get("/api/architectures", async (req, res) => {
    try {
      const architectures = await storage.getAllArchitectures();
      res.json(architectures);
    } catch (error) {
      res.status(500).json({ message: "Error fetching architectures" });
    }
  });

  // Get architecture by slug
  app.get("/api/architectures/:slug", async (req, res) => {
    try {
      const architecture = await storage.getArchitectureBySlug(req.params.slug);
      if (!architecture) {
        return res.status(404).json({ message: "Architecture not found" });
      }
      res.json(architecture);
    } catch (error) {
      res.status(500).json({ message: "Error fetching architecture" });
    }
  });

  // AI Pattern Recommendations
  app.post("/api/recommendations", async (req, res) => {
    try {
      const request: RecommendationRequest = req.body;
      
      if (!request.projectDescription || request.projectDescription.trim().length < 10) {
        return res.status(400).json({ 
          message: "La descripción del proyecto debe tener al menos 10 caracteres" 
        });
      }

      const recommendations = await getPatternRecommendations(request);
      res.json({ recommendations });
    } catch (error) {
      console.error("Error getting recommendations:", error);
      res.status(500).json({ message: "Error generando recomendaciones" });
    }
  });

  // Favorites endpoints
  app.get("/api/favorites", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      if (!userId) {
        return res.status(400).json({ error: "userId is required" });
      }
      const favorites = await storage.getFavorites(userId);
      res.json(favorites);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      res.status(500).json({ error: "Failed to fetch favorites" });
    }
  });

  app.post("/api/favorites", async (req, res) => {
    try {
      const { patternId, userId } = req.body;
      if (!patternId || !userId) {
        return res.status(400).json({ error: "patternId and userId are required" });
      }
      const favorite = await storage.addFavorite(patternId, userId);
      res.json(favorite);
    } catch (error) {
      console.error("Error adding favorite:", error);
      res.status(500).json({ error: "Failed to add favorite" });
    }
  });

  app.delete("/api/favorites/:patternId", async (req, res) => {
    try {
      const patternId = parseInt(req.params.patternId);
      const { userId } = req.body;
      if (!userId) {
        return res.status(400).json({ error: "userId is required" });
      }
      await storage.removeFavorite(patternId, userId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error removing favorite:", error);
      res.status(500).json({ error: "Failed to remove favorite" });
    }
  });

  // Code generation endpoint
  app.post("/api/patterns/:slug/generate-code", async (req, res) => {
    try {
      const { slug } = req.params;
      const { language, context } = req.body;
      
      if (!language || !context) {
        return res.status(400).json({ error: "language and context are required" });
      }

      const pattern = await storage.getPatternBySlug(slug);
      if (!pattern) {
        return res.status(404).json({ error: "Pattern not found" });
      }

      // Generate code using OpenAI
      const generatedCode = await generateCodeSnippet(pattern, language, context);
      
      // Save the generated snippet
      const snippet = await storage.saveGeneratedSnippet({
        patternId: pattern.id,
        language,
        context,
        code: generatedCode.code,
        explanation: generatedCode.explanation
      });

      res.json(snippet);
    } catch (error) {
      console.error("Error generating code:", error);
      res.status(500).json({ error: "Failed to generate code" });
    }
  });

  // Explain pattern choice for a specific context
  app.post("/api/patterns/:slug/explain", async (req, res) => {
    try {
      const { slug } = req.params;
      const { projectContext } = req.body;
      
      if (!projectContext || projectContext.trim().length < 10) {
        return res.status(400).json({ 
          message: "El contexto del proyecto debe tener al menos 10 caracteres" 
        });
      }

      const explanation = await explainPatternChoice(slug, projectContext);
      res.json({ explanation });
    } catch (error) {
      console.error("Error explaining pattern:", error);
      res.status(500).json({ message: "Error generando explicación" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
