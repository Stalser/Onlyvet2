# OnlyVet Auth UI (минимальный пример)

Это минимальный Next.js-проект с экраном авторизации OnlyVet:

- Вход по паролю (email + пароль)
- Вход по коду на email (magic link / OTP)
- Интерфейс для входа по телефону (логика будет добавлена позже)

## Как запустить

1. Установить зависимости:

   npm install

2. Создать файл `.env.local` рядом с `package.json` на основе `.env.example`
   и подставить реальные значения из Supabase (Settings → API):

   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...

3. Запустить dev-сервер:

   npm run dev

4. Открыть в браузере:

   http://localhost:3000/login
