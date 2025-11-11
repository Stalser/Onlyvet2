OnlyVet Auth DB — FIO+Phone bundle + Dev test

1) Добавлены поля ФИО и Телефон:
   - /auth/register отправляет { fio, phone, email } в /api/auth/request-code
   - users: email (uniq), full_name, phone

2) Dev-тест (болванка аккаунта):
   - email: tester@onlyvet.dev
   - Способы входа:
     a) POST /api/auth/request-code { email:'tester@onlyvet.dev' } → код вернётся в ответе (dev)
        затем POST /api/auth/verify-code { email, code } → cookie-сессия
     b) (Быстрее) включить переменную окружения ONLYVET_DEV=1 и вызвать:
        POST /api/auth/dev-login  body: { "email": "tester@onlyvet.dev" }

3) За БД отвечает lib/db.ts (ленивый импорт pg, auto ensure tables).
   - Для реальной БД добавьте DATABASE_URL и зависимость pg.
