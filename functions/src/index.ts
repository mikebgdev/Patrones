import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

/**
 * Cloud Function onWrite en /patterns/{id} para actualizar contadores automáticos.
 */
export const updatePatternCounts = functions.firestore
  .document('patterns/{patternId}')
  .onWrite(async (_change, _context) => {
    const db = admin.firestore();

    // Leer todos los patrones
    const snap = await db.collection('patterns').get();
    const patterns = snap.docs.map((d) => d.data());

    const archCounts: Record<string, number> = {};
    const langCounts: Record<string, number> = {};

    // Calcular agregados
    patterns.forEach((p: any) => {
      (p.architectures || []).forEach((arch: string) => {
        archCounts[arch] = (archCounts[arch] || 0) + 1;
      });
      (p.languages || []).forEach((lang: string) => {
        langCounts[lang] = (langCounts[lang] || 0) + 1;
      });
    });

    const batch = db.batch();
    // Actualizar arquitecturas
    Object.entries(archCounts).forEach(([arch, count]) => {
      const ref = db.collection('architectures').doc(arch);
      batch.update(ref, { patternsCount: count });
    });
    // Actualizar lenguajes
    Object.entries(langCounts).forEach(([lang, count]) => {
      const ref = db.collection('languages').doc(lang);
      batch.update(ref, { patternsCount: count });
    });

    return batch.commit();
  });