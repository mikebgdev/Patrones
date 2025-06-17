# Design Patterns Explorer – Especificación técnica

> Documento destinado a Codex / ChatGPT para guiar el desarrollo de la nueva aplicación web de patrones de diseño. **Versión enfocada 100 % en Firebase Firestore**.

---

## 1. Objetivo

Crear una plataforma que permita **explorar, aprender y filtrar** patrones de diseño de programación basados en el catálogo de Refactoring Guru, añadiendo contexto sobre arquitecturas modernas y lenguajes/frameworks populares. El público objetivo son **desarrolladores novatos** que necesitan explicaciones sencillas y ejemplos de código.

---

## 2. Arquitectura del proyecto

| Capa                     | Tecnología                                                                                                                                         | Descripción                                                                                             |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Frontend**             | React + TypeScript (Vite **o** Next.js)                                                                                                            | UI SPA con enrutado por páginas (`/`, `/architectures`, `/languages`, `/favorites`, `/patterns/:slug`). |
| **Gestión de estado**    | Context API + useReducer (ya existen `FavoritesContext`, `FilterContext`, `ThemeContext`, `ToastContext`).                                         |                                                                                                         |
| **Backend as a Service** | **Firebase (v9 modular)**: *Auth* (anónimo), *Firestore* (base de datos), *Storage* (icons), *Cloud Functions* (cálculo de contadores & triggers). |                                                                                                         |
| **Estilos**              | Tailwind CSS + DaisyUI (o similar).                                                                                                                |                                                                                                         |

> **Nota**: El backend relacional (Firebird) se descarta. Toda persistencia se centraliza en **Firestore** con actualización en tiempo real.

---

## 3. Rutas y vistas principales

| Ruta                 | Descripción                                                                                 | Componentes clave                                |
| -------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| **/**                | Home – catálogo completo de patrones con filtros (tipo, arquitectura, lenguaje, favoritos). | `FilterSection`, `PatternCatalog`, `PatternCard` |
| **/architectures**   | Lista de arquitecturas (DDD, Hexagonal…) con contador automático de patrones compatibles.   | `ArchitectureGrid`, `ArchitectureCard`           |
| **/languages**       | Lista de lenguajes/frameworks (PHP, React, Vue, Symfony…) con contador automático.          | `LanguageGrid`, `LanguageCard`                   |
| **/favorites**       | Solo los patrones marcados por el usuario.                                                  | `PatternCatalog` reutilizado                     |
| **/patterns/\:slug** | Vista detalle de un patrón.                                                                 | `PatternDetail`, `CodeExamplesTabs`              |

---

## 4. Modelo de datos (Firestore)

```text
/architectures
  id: slug (ej: ddd)
  name: "Domain‑Driven Design"
  iconUrl: string
  description: string
  patternsCount: number // calculado por Cloud Function

/languages
  id: slug (ej: php)
  name: "PHP"
  iconUrl: string
  description: string
  patternsCount: number

/patterns
  id: slug (ej: factory‑method)
  name: string
  iconUrl: string
  type: "creational" | "structural" | "behavioral"
  difficulty: 1–5
  descriptionShort: string
  descriptionLong: markdown
  codeExamples: { [languageSlug]: string }
  relatedPatterns: string[] // slugs
  guruUrl: string
  architectures: string[] // slugs
  languages: string[] // slugs

/users/{uid}/favorites/{patternId}
  patternId: true // documento vacío para marcar favorito
```

---

## 5. Lógica de negocio

### 5.1 Filtrado en Home

1. **Tipo**: select simple (Creacional / Estructural / Comportamiento).
2. **Arquitecturas**: multiselect; consulta Firestore donde `architectures` **array‑contains‑any** los slugs seleccionados.
3. **Lenguajes**: multiselect; consulta con `languages` **array‑contains‑any**.
4. **Favoritos**: si está activo, filtra localmente usando el contexto `FavoritesContext`.
5. **Búsqueda**: índice full‑text simple en client (`toLowerCase().includes(query)`).

### 5.2 Favoritos

* **Auth anónimo** para persistir la colección `favorites` por usuario.
* `FavoritesContext` se suscribe a la subcolección en tiempo real.

### 5.3 Contadores automáticos

* **Cloud Function** *onWrite* en `/patterns/{id}`:

    1. Calcula `patternsCount` por arquitectura y lenguaje mediante agregados.
    2. Actualiza los campos `patternsCount` en cada documento de arquitectura y lenguaje correspondiente.

---

## 6. Componentes UI

| Componente                          | Propósito                                                                                 |
| ----------------------------------- | ----------------------------------------------------------------------------------------- |
| `PatternCard`                       | Muestra icono, nombre, badges (tipo, dificultad), chips de lenguajes y botón de favorito. |
| `PatternCatalog`                    | Grid responsivo que recibe `filters` y ejecuta la query a Firestore.                      |
| `FilterSection`                     | Controles de filtrado y contador total.                                                   |
| `ArchitectureCard` / `LanguageCard` | Icono, nombre, descripción, contador de patrones.                                         |
| `CodeExamplesTabs`                  | Abas con snippets de código destacados con Prism.js.                                      |

---

## 7. Roadmap de tareas

1. **Configurar Firebase**: crear proyecto, habilitar Auth anónimo, Firestore y Storage.
2. Importar datos iniciales en `/patterns`, `/architectures`, `/languages` (script Node o `firebase import`).
3. Desarrollar rutas con React Router / Next.js.
4. Implementar `PatternCard` + `PatternCatalog`.
5. Desarrollar `FilterSection` y lógica de filtros (array‑contains‑any + client search).
6. Páginas `/architectures` y `/languages` con contadores.
7. Page `/favorites` con contexto.
8. Vista detalle `/patterns/:slug`.
9. Cloud Functions para contadores automáticos.
10. Deploy a Firebase Hosting o Vercel.

---

## 8. Accesibilidad y UX

* Contraste alto y modo oscuro (`ThemeContext`).
* Navegación con teclado.
* Tooltips para vocabulario técnico.

---

## 9. Recursos

* Catálogo Refactoring Guru: [https://refactoring.guru/es/design-patterns/catalog](https://refactoring.guru/es/design-patterns/catalog)
* Firebase v9 docs: [https://firebase.google.com/docs](https://firebase.google.com/docs)
* Iconos: Tabler Icons, Simple Icons.

---

## 10. Licencia

Contenido derivado de Refactoring Guru para fines educativos. Revisa sus términos de uso.

---

## 11. **Checklist – Pasos para integrar Firestore**

> Copia/pega esta lista en tu README si quieres un resumen accionable

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
* [ ] Desplegar Cloud Functions `onWrite` para contadores.

---

**¡Listo!** Toda la aplicación está ahora alineada exclusivamente con Firestore.
