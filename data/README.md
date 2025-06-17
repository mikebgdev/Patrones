# Datos iniciales para Firestore

Rellena estos archivos JSON con los datos iniciales que se importarán en Firestore, siguiendo la especificación técnica de **EXPLAIN.MD**:

- **patterns.json**: Array de objetos Pattern con campos:
  - id (slug)
  - name
  - iconUrl
  - type ("creational" | "structural" | "behavioral")
  - difficulty (1–5)
  - descriptionShort
  - descriptionLong (markdown)
  - codeExamples (objeto mapping languageSlug → código)
  - relatedPatterns (array de slugs)
  - guruUrl (URL a Refactoring Guru)
  - architectures (array de slugs)
  - languages (array de slugs)

- **architectures.json**: Array de objetos Architecture con campos:
  - id (slug)
  - name
  - iconUrl
  - description
  - patternsCount (número, puede dejarse 0 si se calcula con Cloud Function)

- **languages.json**: Array de objetos Language con campos:
  - id (slug)
  - name
  - iconUrl
  - description
  - patternsCount (número, puede dejarse 0 si se calcula con Cloud Function)