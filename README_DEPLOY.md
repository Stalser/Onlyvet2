# OnlyVet — Next.js (Vercel Ready)

Полноценный сайт-платформа OnlyVet по брендбуку: запись к врачу, FAQ, обратная связь, ЛК, задел под CRM Vetmanager и оплату.

---

## Локальный запуск
```bash
npm install
npm run dev
# http://localhost:3000
```

## Deploy: GitHub → Vercel (рекомендовано)
1) Инициализируйте репозиторий:
```bash
git init
git add .
git commit -m "OnlyVet: initial"
git branch -M main
git remote add origin https://github.com/<your_login>/onlyvet.git
git push -u origin main
```
2) Зайдите на https://vercel.com → New Project → Import Git Repository → выберите репозиторий.
3) В Environment Variables добавьте:
```
NEXT_PUBLIC_BASE_URL = https://<project>.vercel.app
VETMANAGER_BASE_URL  = https://<vetmanager_host>/api/v2   # позже
VETMANAGER_API_KEY   = <token>                             # позже
```
4) Дождитесь деплоя и откройте сайт.

### Deploy Button (после публикации репозитория)
Добавьте кнопку в README вашего репозитория:
```md
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/<your_login>/onlyvet)
```

## Альтернатива: Vercel CLI
```bash
npm install -g vercel
vercel                # staging/preview
vercel --prod         # в продакшн
```
Vercel спросит логин и предложит создать проект автоматически.

## Домены
Vercel → Settings → Domains → Add → добавьте `onlyvet.ru` (или другой) и настройте DNS.

## Переменные окружения
Шаблон `.env.example`. На Vercel их задайте в Project → Settings → Environment Variables.

## Payments
`/api/payment` сейчас stub. Для боевой оплаты подключите Stripe/ЮKassa/CloudPayments и добавьте секреты провайдера в переменные окружения.

## CRM Vetmanager
`app/api/vetmanager/route.ts` — прокси/заглушка. Замените URL/схему на фактические из документации.
Сопоставьте `doctorId` в `lib/data.ts` с внешними ID врачей из Vetmanager.
