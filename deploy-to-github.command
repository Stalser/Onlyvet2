#!/bin/bash
cd "$(dirname "$0")"

echo "========================================="
echo " 🚀 OnlyVet — автоматическая заливка в GitHub"
echo "========================================="

# Проверка наличия Git
if ! command -v git >/dev/null 2>&1; then
  echo "[X] Git не установлен. Открою сайт установки..."
  open "https://git-scm.com/download/mac"
  exit 1
fi

# Проверка Node.js (опционально)
if ! command -v node >/dev/null 2>&1; then
  echo "[!] Node.js не найден. Это не критично, но рекомендую установить."
fi

# Сохранённый репозиторий (чтобы не спрашивать каждый раз)
CONFIG_FILE=".deploy_config"
if [ -f "$CONFIG_FILE" ]; then
  REPO_URL=$(cat "$CONFIG_FILE")
else
  echo -n "Введите URL вашего репозитория (например, https://github.com/yourname/onlyvet.git): "
  read REPO_URL
  echo "$REPO_URL" > "$CONFIG_FILE"
fi

if [ -z "$REPO_URL" ]; then
  echo "[X] Не указан репозиторий. Перезапустите скрипт."
  exit 1
fi

echo "[*] Инициализирую Git..."
git init >/dev/null 2>&1
git add . >/dev/null 2>&1
git commit -m "OnlyVet: initial upload" >/dev/null 2>&1
git branch -M main >/dev/null 2>&1
git remote remove origin 2>/dev/null
git remote add origin "$REPO_URL"

echo "[*] Отправляю проект на GitHub..."
git push -u origin main || { echo "[X] Ошибка при push. Проверьте токен доступа или URL."; exit 1; }

echo "[✓] Готово! Открою репозиторий в браузере..."
open "$REPO_URL"

echo "-----------------------------------------"
echo "✅ Проект успешно загружен на GitHub."
echo "-----------------------------------------"
read -n 1 -s -r -p "Нажмите любую клавишу для выхода..."
