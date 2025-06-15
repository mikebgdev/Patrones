# Tareas para migración de PostgreSQL a Firebase

Este documento lista las tareas necesarias para migrar la aplicación de usar una base de datos PostgreSQL (Drizzle/Neon) a usar Firebase (Firestore).
Como referencia, puedes revisar el proyecto de ejemplo: https://github.com/mikebgdev/Shortcuts

## 1. Configuración de Firebase
- [ ] Asegurar que el proyecto de Firebase esté creado y accesible.
- [ ] Verificar que la configuración de Firebase esté correctamente definida en `src/lib/env.ts` y `src/lib/firebase.ts`.
- [ ] Verificar variables de entorno en `.env.local`:
  - `VITE_FIREBASE_API_KEY`
  - `VITE_FIREBASE_PROJECT_ID`
  - `VITE_FIREBASE_APP_ID`
- [ ] (Opcional) Configurar y habilitar los emuladores de Firebase (Firestore, Auth, ...).

## 2. Limpieza de dependencias de Postgres/Drizzle
- [x] Eliminar dependencias de Drizzle y Neon en `package.json`:
  - `@neondatabase/serverless`
  - `drizzle-orm`
  - `drizzle-zod`
  - `drizzle-orm/neon-serverless`
  - `drizzle-orm/pg-core`
- [x] Eliminar o refactorizar los siguientes archivos relacionados con Postgres:
  - `server/db.ts`
  - `shared/schema.ts`
  - `server/seed.ts` (reescribir para Firestore)

## 3. Eliminación de la capa de backend y consumo directo en cliente
- [x] Eliminar la carpeta `server/` y todo el código asociado al backend (rutas, storage, configuración Vite/Express).
- [ ] Ajustar en el cliente (`src/lib/firebase.ts` y servicios/hooks) las consultas directas a Firestore para las colecciones:
  - `patterns`
  - `architectures`
  - `favorites`
  - `generatedSnippets`
- [ ] Reemplazar llamadas a endpoints REST en componentes React por consultas directas a Firestore.

## 4. Ajustes en Docker y despliegue
- [x] Actualizar `Dockerfile` y `docker-compose.yml` para eliminar la capa de backend (`server/`) y limpiar la orquestación de Postgres/Neon.

## 5. Actualizaciones en el cliente (opcional)
- [ ] Añadir funciones al cliente (`src/lib/firebase.ts`) para leer `patterns` y `architectures` de Firestore (ver proyecto Shortcuts).
- [ ] Reemplazar llamadas a `/api/patterns` y `/api/architectures` por llamadas directas a Firebase.
- [ ] Ajustar componentes React para consumir datos desde Firestore.

## 6. Pruebas y validación
- [ ] Probar consultas directas a Firestore desde el cliente.
- [ ] Validar la funcionalidad de patrones, arquitecturas, favoritos y snippets generados.

## 7. Documentación
- [ ] Actualizar `README.md` con las instrucciones de configuración de Firebase en el cliente (`src/lib/env.ts` y `src/lib/firebase.ts`).
- [ ] Eliminar cualquier referencia a la carpeta `server/` y a seed scripts en la documentación.

---

**Referencia útil:** Revisa la implementación de Firebase en el proyecto Shortcuts: https://github.com/mikebgdev/Shortcuts