# Tareas Pendientes

A continuación se listan los principales cambios y correcciones detectados al revisar el proyecto.

## Limpieza de código

- ~~Eliminar comentarios inline en archivos TypeScript y TSX. Por ejemplo, en `src/contexts/FilterContext.tsx` existe un comentario innecesario.~~ Comentario eliminado.
- Revisar archivos CSS y demás recursos por comentarios redundantes que puedan eliminarse para mantener un estilo consistente.

## Componentes sin uso

- En `src/components/ui/` hay múltiples componentes (como `accordion.tsx`, `alert-dialog.tsx`, `breadcrumb.tsx`, etc.) que no se usan en el resto del proyecto. Conviene eliminarlos o moverlos a un paquete externo para reducir el tamaño del bundle y simplificar el mantenimiento.

## Lógica duplicada

- Las páginas `Architectures.tsx` y `Languages.tsx` repiten prácticamente el mismo esquema de tarjetas y filtrado. Sería útil extraer un componente o hook reutilizable para evitar duplicidad.
- Las funciones de obtención de datos (`getArchitectures`, `getLanguages`, `getPatterns`) se emplean en varios componentes. Considerar un servicio o conjunto de hooks centralizados para manejarlas.
- `initFirestore.ts` contiene dos bloques de carga de datos casi idénticos (uno para entorno servidor y otro para navegador). Unificar dichos bucles facilitaría el mantenimiento.

## Archivos y configuraciones

- Revisar si los archivos JSON dentro de `data/` deben permanecer en el repositorio o pueden generarse de forma dinámica.
- Comprobar que `index.html` no incluya scripts o etiquetas sin utilizar. Actualmente parece limpio, pero conviene asegurarlo.
- Verificar las variables de entorno definidas en `env.ts` y en `.env`; algunas como `PROJECT_NAME` o `APP_ENV` no se utilizan en el código.
- ~~En `package.json` el nombre del paquete aparece como `partrones`; probablemente debería ser `patrones`.~~ Corregido.
- `tsconfig.json` excluye `src/components/ui` del proceso de compilación. Confirmar si es intencional o un descuido.

## Otros aspectos

- El proyecto no contiene pruebas automatizadas a pesar de tener configurado Jest. Añadir tests mejoraría la fiabilidad del código y permitiría aprovechar el script `test:coverage`.
- Revisar el archivo `.drone.yml`, ya que la última línea del script de despliegue parece incompleta.
