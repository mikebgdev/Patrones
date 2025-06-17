# Tareas pendientes - Lista de pasos para completar el proyecto

Este documento describe de forma detallada todas las tareas necesarias para implementar la aplicación siguiendo la especificación técnica de **EXPLAIN.MD**.

---

## 1. Configuración inicial de Firebase

- [x] Crear proyecto en Firebase Console.
- [x] Añadir aplicación web y copiar el objeto `firebaseConfig` en `lib/firebase.ts`.
- [x] Instalar SDK modular de Firebase v9:

  ```bash
  npm install firebase@^9.0.0
  ```
- [x] Activar **Auth anónimo** en la consola de Firebase.
- [x] Habilitar **Firestore** (modo nativo) y **Storage** para alojar los iconos.
- [x] Definir reglas de seguridad en Firestore (leer patrón, arquitecturas, lenguajes; permitir lectura y escritura de `users/{uid}/favorites/{patternId}` solo con autenticación anónima).

---

## 2. Importación de datos iniciales

- [x] Crear un script (Node.js o TypeScript) para importar los datos iniciales de `/patterns`, `/architectures` y `/languages`.
- [x] Ejecutar el script o usar `firebase import` para poblar Firestore con el contenido derivado de Refactoring Guru.

---

## 3. Estructura de rutas y navegación

- [x] Definir rutas principales: `/`, `/architectures`, `/languages`, `/favorites`, `/patterns/:slug`.
- [x] Configurar el enrutado en React (React Router/Wouter) según la tecnología elegida (Vite + Wouter).

---

## 4. Gestión de estado y contextos

- [x] Verificar o implementar `FavoritesContext` con suscripción en tiempo real a `users/{uid}/favorites` usando Firestore.
- [x] Verificar o implementar `FilterContext` para filtros globales usando useReducer y Context API.
- [x] Verificar o implementar `ThemeContext` para modo claro/oscuro usando useReducer y Context API.
- [x] Verificar o implementar `ToastContext` para notificaciones usando useReducer y Context API.
- [x] Utilizar useReducer y Context API para mantener la consistencia de estado en todos los contextos.

---

## 5. Componentes UI principales

- [x] `PatternCard`: icono, nombre, badges (tipo, dificultad), chips de lenguajes y botón de favorito (ruta `/patterns/:slug`).
- [x] `PatternCatalog`: grid responsivo con filtros y orden, incluyendo filtro de favoritos.
- [x] `FilterSection`: controles de filtrado (tipo, arquitecturas, lenguajes, búsqueda, favoritos) y contador total.
- [x] `ArchitectureCard` / `LanguageCard`: icono, nombre, descripción y contador de patrones.
- [x] `ArchitectureGrid` / `LanguageGrid`: layout de tarjetas de arquitecturas/lenguajes.
- [ ] `PatternDetail`: vista detallada de un patrón con `CodeExamplesTabs` y patrones relacionados.
- [x] `CodeExamplesTabs`: integración de Prism.js para snippets de código.

---

## 6. Lógica de filtrado en Home (/)

- [x] Filtro por **tipo**: consulta Firestore con `where('type', '==', ...)`.
- [x] Filtro por **arquitecturas**: consulta Firestore con `where('architectures', 'array-contains-any', ...)`.
- [x] Filtro por **lenguajes**: consulta Firestore con `where('languages', 'array-contains-any', ...)`.
- [x] Filtro de **favoritos**: aplica `FavoritesContext` en cliente.
- [x] Búsqueda simple en cliente con `toLowerCase().includes(query)`.

---

## 7. Páginas adicionales

- [x] Página **/architectures**: ArchitectureGrid + hook useArchitectures/usePatterns.
- [x] Página **/languages**: LanguageGrid + hook useLanguages/usePatterns.
- [x] Página **/favorites**: PatternCatalog filtrado por favoritos.
- [x] Página **/patterns/:slug**: PatternDetail con CodeExamplesTabs.

---

## 8. Cloud Functions para contadores automáticos

- [x] Implementar Cloud Function `onWrite` en `/patterns/{patternId}` (Firebase Functions v2).
- [x] Calcular agregados de patrones por arquitectura y por lenguaje.
- [x] Actualizar el campo `patternsCount` en documentos de arquitecturas y lenguajes.

---

## 9. Estilos, accesibilidad y UX

- [ ] Configurar Tailwind CSS + DaisyUI (o librería similar).
- [ ] Implementar modo claro/oscuro con `ThemeContext` y persistencia.
- [ ] Asegurar contraste adecuado y navegación por teclado.
- [ ] Añadir tooltips para vocabulario técnico.

---

## 10. Despliegue y publicación

- [ ] Configurar despliegue en Firebase Hosting o Vercel.
- [ ] Ajustar entorno de producción en Vite/Next.js.
- [ ] Verificar comportamiento en tiempo real y reglas de seguridad.

---

## 11. Limpieza de archivos obsoletos

- [ ] Eliminar todos los archivos JavaScript no utilizados (código legacy o scripts antiguos).
- [ ] Revisar y borrar componentes, utilidades o configuraciones en `.js` que ya no sean necesarios.

---

## 12. Checklist – Pasos para integrar Firestore (copiar a README si se desea)

* [ ] Crear proyecto en Firebase Console.
* [ ] Añadir aplicación web y copiar el config (`firebaseConfig`).
* [ ] Instalar SDK modular:

  ```bash
  npm i firebase@^9.0.0
  ```
* [ ] Inicializar servicios en `lib/firebase.ts`:

  ```ts
  import { initializeApp } from "firebase/app";
  import { getAuth } from "firebase/auth";
  import { getFirestore } from "firebase/firestore";
  import { getStorage } from "firebase/storage";

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);
  export const storage = getStorage(app);
  ```
* [ ] Activar **Auth anónimo** en la consola.
* [ ] Crear reglas de seguridad:

  ```
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /patterns/{id} { allow read: if true; }
      match /architectures/{id} { allow read: if true; }
      match /languages/{id} { allow read: if true; }
      match /users/{uid}/favorites/{patternId} {
        allow read, write: if request.auth != null && request.auth.uid == uid;
      }
    }
  }
  ```
* [ ] Escribir función `toggleFavorite` usando `setDoc` / `deleteDoc`.
* [ ] Implementar consulta con filtros usando `query`, `where`, `orderBy`, `arrayContainsAny`.
* [ ] Desplegar Cloud Functions `onWrite` para contadores.

---

**¡Comenzar aquí y avanzar por esta lista hasta completar cada punto!**