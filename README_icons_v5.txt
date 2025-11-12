OnlyVet Icons v5 — cache-busting patch

Что меняется:
- app/icon.png и app/apple-icon.png — App Router подхватывает их автоматически.
- public/favicon-v5.ico, favicon-32x32-v5.png, icon-192x192-v5.png, icon-512x512-v5.png
- public/safari-pinned-tab-v5.svg
- public/manifest.json — прописаны v5 имена.
- app/layout.tsx — подключены новые иконки и OpenGraph/Twitter.

Шаги:
1) Залей всё из архива в свой проект (замени существующие файлы).
2) Commit → Deploy.
3) Проверь в браузере прямые ссылки:
   /favicon-v5.ico
   /icon-192x192-v5.png
   /icon-512x512-v5.png
   /apple-icon.png
   /manifest.json
4) Обнови вкладку (Cmd/Ctrl + Shift + R). В Safari при необходимости очисти Website Data.
