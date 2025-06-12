import { db } from "./db";
import { patterns, architectures } from "@shared/schema";
import { mockPatterns, mockArchitectures } from "../client/src/lib/patterns-data";

async function seedDatabase() {
  console.log("Seeding database...");
  
  try {
    // Clear existing data
    await db.delete(patterns);
    await db.delete(architectures);
    
    // Insert architectures
    for (const arch of mockArchitectures) {
      const { id, ...insertArch } = arch;
      await db.insert(architectures).values(insertArch);
    }
    console.log(`Inserted ${mockArchitectures.length} architectures`);
    
    // Insert patterns
    for (const pattern of mockPatterns) {
      const { id, ...insertPattern } = pattern;
      await db.insert(patterns).values(insertPattern);
    }
    console.log(`Inserted ${mockPatterns.length} patterns`);
    
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();