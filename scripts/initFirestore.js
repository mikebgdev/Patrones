import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

/**
 * Migration script to create base Firestore collections.
 *
 * Usage:
 *  node scripts/initFirestore.js
 */
async function main() {
  const app = initializeApp();
  const db = getFirestore(app);

  const dataDir = path.resolve('data');


  // Import architectures
  const archFile = path.join(dataDir, 'architectures.json');
  const architectures = JSON.parse(await readFile(archFile, 'utf-8'));
  for (const arch of architectures) {
    const id = arch.id || arch.slug;
    await db.collection('architectures').doc(String(id)).set(arch);
  }

  // Import languages
  const langFile = path.join(dataDir, 'languages.json');
  const languages = JSON.parse(await readFile(langFile, 'utf-8'));
  for (const lang of languages) {
    const id = lang.id || lang.slug;
    await db.collection('languages').doc(String(id)).set(lang);
  }

  console.log('Base collections created successfully');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
