# Refactor Tasks for Patrones

The repository contains several comments, unused files and duplicated logic. Below is a list of tasks to perform in order to clean and refactor the code base.

## General cleanup
- Remove all inline comments (`//`, `/* */`) from `.tsx` and `.ts` files.
- Delete any leftover commented blocks (e.g. commented `<CodeExamplesTabs>` in `PatternDetail.tsx`).
- Format the code after comment removal to keep consistent style.

## Unused components
Many UI components under `src/components/ui` are not referenced anywhere else. Consider removing them to reduce bundle size:
- `accordion.tsx`
- `alert-dialog.tsx`
- `alert.tsx`
- `aspect-ratio.tsx`
- `avatar.tsx`
- `breadcrumb.tsx`
- `calendar.tsx`
- `carousel.tsx`
- `chart.tsx`
- `checkbox.tsx`
- `collapsible.tsx`
- `command.tsx`
- `context-menu.tsx`
- `dialog.tsx`
- `drawer.tsx`
- `dropdown-menu.tsx`
- `hover-card.tsx`
- `input-otp.tsx`
- `menubar.tsx`
- `navigation-menu.tsx`
- `pagination.tsx`
- `progress.tsx`
- `radio-group.tsx`
- `resizable.tsx`
- `scroll-area.tsx`
- `separator.tsx`
- `sidebar.tsx` (very large with many comments)
- `skeleton.tsx`
- `slider.tsx`
- `table.tsx`
- `textarea.tsx`
- `toggle-group.tsx`

Review if any of these are required before deleting.

## Duplicate logic
- `Architectures.tsx` and `Languages.tsx` share similar card rendering logic. Extract a reusable component or hook to avoid duplication.
- Data fetching using `getArchitectures`, `getLanguages` and `getPatterns` is repeated in various components. Create a service layer or hooks to centralize it.
- The `initFirestore` function has almost identical loops for server and browser. Consider unifying the logic.

## Other improvements
- Verify if `data/` JSON files need to live in the repo or can be generated/loaded dynamically.
- Check `index.html` for unused scripts or tags (e.g. html2canvas script).
- Review environment variables in `env.ts` and remove unused ones.

