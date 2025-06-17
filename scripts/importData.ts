import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { firebaseConfig } from '../src/lib/env';

/**
 * Script de importación de datos iniciales en Firestore.
 *
 * Lee archivos JSON estáticos de la carpeta /data y los inserta en las colecciones
 * patterns, architectures y languages de Firestore.
 *
 * Uso:
 *   npm run import:data
 */
async function main() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // Carpeta de datos JSON
  const dataDir = path.resolve(__dirname, '../data');

  // Importar patterns
  const patternsFile = path.join(dataDir, 'patterns.json');
  const patternsJson = await readFile(patternsFile, 'utf-8');
  const patterns = JSON.parse(patternsJson);
  console.log(`Importando ${patterns.length} patrones...`);
  for (const pat of patterns) {
    const id = pat.id || pat.slug;
    await setDoc(doc(db, 'patterns', id.toString()), pat);
  }

  // Importar architectures
  const archFile = path.join(dataDir, 'architectures.json');
  const archJson = await readFile(archFile, 'utf-8');
  const architectures = JSON.parse(archJson);
  console.log(`Importando ${architectures.length} arquitecturas...`);
  for (const arch of architectures) {
    await setDoc(doc(db, 'architectures', arch.id.toString()), arch);
  }

  // Importar languages
  const langsFile = path.join(dataDir, 'languages.json');
  const langsJson = await readFile(langsFile, 'utf-8');
  const languages = JSON.parse(langsJson);
  console.log(`Importando ${languages.length} lenguajes/frameworks...`);
  for (const lang of languages) {
    await setDoc(doc(db, 'languages', lang.id.toString()), lang);
  }

  console.log('Importación completada.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});