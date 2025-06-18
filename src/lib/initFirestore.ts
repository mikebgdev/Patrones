import { db } from './firebase';
import { setDoc, doc, getDoc } from 'firebase/firestore';

export async function initFirestore(): Promise<void> {
  if (typeof window === 'undefined') {
    const { readFile } = await import('node:fs/promises');
    const path = await import('node:path');
    const dataDir = path.resolve('data');

    const archFile = path.join(dataDir, 'architectures.json');
    const architectures = JSON.parse(await readFile(archFile, 'utf-8'));
    for (const arch of architectures) {
      const id = arch.id || arch.slug;
      const ref = doc(db, 'architectures', String(id));
      const snap = await getDoc(ref);
      if (!snap.exists()) {
        await setDoc(ref, arch);
      }
    }

    const langFile = path.join(dataDir, 'languages.json');
    const languages = JSON.parse(await readFile(langFile, 'utf-8'));
    for (const lang of languages) {
      const id = lang.id || lang.slug;
      const ref = doc(db, 'languages', String(id));
      const snap = await getDoc(ref);
      if (!snap.exists()) {
        await setDoc(ref, lang);
      }
    }

    const patternsFile = path.join(dataDir, 'patterns.json');
    const patterns = JSON.parse(await readFile(patternsFile, 'utf-8'));
    for (const pattern of patterns) {
      const id = pattern.id || pattern.slug;
      const ref = doc(db, 'patterns', String(id));
      const snap = await getDoc(ref);
      if (!snap.exists()) {
        await setDoc(ref, pattern);
      }
    }
  } else {
    const fetchJson = (file: string) => fetch(file).then((res) => res.json());
    const architectures = await fetchJson('/data/architectures.json');
    for (const arch of architectures) {
      const id = arch.id || arch.slug;
      const ref = doc(db, 'architectures', String(id));
      const snap = await getDoc(ref);
      if (!snap.exists()) {
        await setDoc(ref, arch);
      }
    }
    const languages = await fetchJson('/data/languages.json');
    for (const lang of languages) {
      const id = lang.id || lang.slug;
      const ref = doc(db, 'languages', String(id));
      const snap = await getDoc(ref);
      if (!snap.exists()) {
        await setDoc(ref, lang);
      }
    }

    const patterns = await fetchJson('/data/patterns.json');
    for (const pattern of patterns) {
      const id = pattern.id || pattern.slug;
      const ref = doc(db, 'patterns', String(id));
      const snap = await getDoc(ref);
      if (!snap.exists()) {
        await setDoc(ref, pattern);
      }
    }
  }

  console.log('Base collections created successfully');
}
