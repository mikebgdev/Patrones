import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { db } from './firebase';
import { setDoc, doc } from 'firebase/firestore';

/**
 * Migration script to create base Firestore collections.
 *
 * Usage:
 *   npm run init:firestore
 */
async function main() {
  const dataDir = path.resolve('data');

  // Import architectures
  const archFile = path.join(dataDir, 'architectures.json');
  const architectures = JSON.parse(await readFile(archFile, 'utf-8'));
  for (const arch of architectures) {
    const id = arch.id || arch.slug;
    await setDoc(doc(db, 'architectures', String(id)), arch);
  }

  // Import languages
  const langFile = path.join(dataDir, 'languages.json');
  const languages = JSON.parse(await readFile(langFile, 'utf-8'));
  for (const lang of languages) {
    const id = lang.id || lang.slug;
    await setDoc(doc(db, 'languages', String(id)), lang);
  }

  console.log('Base collections created successfully');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

