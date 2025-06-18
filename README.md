# Patrones

[![Build Status](https://drone.mikebgdev.com/api/badges/mikebgdev/Patrones/status.svg)](https://drone.mikebgdev.com/mikebgdev/Patrones)

This project incluye descripciones de patrones de diseño inspiradas en [Refactoring Guru](https://refactoring.guru/). Todo el contenido se ha simplificado y ampliado para facilitar el aprendizaje de personas que comienzan en programación.

## Firebase migration

Para poblar Firestore con las colecciones base de patrones, arquitecturas y lenguajes ejecuta:

```bash
npm run init:firestore
```

El script utiliza `firebase-admin` y se apoya en las credenciales por defecto de Google. Asegúrate de tener las
variables de entorno `VITE_FIREBASE_*` configuradas antes de ejecutarlo.
También puedes realizar la migración desde la página `/admin/firebase`.

## Créditos

Las descripciones de patrones se adaptaron de [Refactoring Guru](https://refactoring.guru/).
