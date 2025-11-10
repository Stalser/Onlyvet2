#!/bin/bash
cd "$(dirname "$0")"

echo "========================================="
echo " 🚀 OnlyVet — GitHub upload via GitHub CLI"
echo "========================================="

# 0) Requirements: gh, git
if ! command -v git >/dev/null 2>&1; then
  echo "[X] Git не установлен. Открою страницу установки..."
  open "https://git-scm.com/download/mac"
  exit 1
fi

if ! command -v gh >/dev/null 2>&1; then
  echo "[X] GitHub CLI (gh) не установлен. Устанавливаю через Homebrew..."
  if ! command -v brew >/dev/null 2>&1; then
    echo "[X] Homebrew не установлен. Открою инструкцию: https://brew.sh"
    open "https://brew.sh"
    exit 1
  fi
  brew install gh || { echo "[X] Не удалось установить gh"; exit 1; }
fi

# 1) Login (opens browser)
if ! gh auth status >/dev/null 2>&1; then
  echo "[*] Авторизация в GitHub CLI..."
  gh auth login || { echo "[X] Авторизация не выполнена"; exit 1; }
fi

# 2) Read or ask repo name/visibility
CONFIG_FILE=".deploy_config_gh"
if [ -f "$CONFIG_FILE" ]; then
  REPO_FULL=$(cat "$CONFIG_FILE")   # e.g. Stalser/Onlyvet2
else
  echo -n "Введите имя репозитория (пример: Onlyvet2): "
  read REPO_NAME
  if [ -z "$REPO_NAME" ]; then echo "[X] Имя репозитория не задано"; exit 1; fi
  USERNAME=$(gh api user -q '.login')
  REPO_FULL="$USERNAME/$REPO_NAME"
  echo "$REPO_FULL" > "$CONFIG_FILE"
fi

echo "[*] Репозиторий: $REPO_FULL"

# 3) Create repo if not exists
if ! gh repo view "$REPO_FULL" >/dev/null 2>&1; then
  echo "[*] Создаю репозиторий $REPO_FULL (private)..."
  gh repo create "$REPO_FULL" --private -y || { echo "[X] Не удалось создать репозиторий"; exit 1; }
else
  echo "[*] Репозиторий уже существует — используем его."
fi

# 4) Init, commit, set remote, push
git init >/dev/null 2>&1
git add .
git commit -m "OnlyVet: initial upload" >/dev/null 2>&1 || true
git branch -M main >/dev/null 2>&1
git remote remove origin 2>/dev/null
git remote add origin "https://github.com/$REPO_FULL.git"

echo "[*] Отправляю проект на GitHub..."
git push -u origin main || { echo "[X] Ошибка при push. Проверьте доступы gh auth status."; exit 1; }

echo "[✓] Готово! Открываю репозиторий и страницу деплоя Vercel..."
open "https://github.com/$REPO_FULL"
open "https://vercel.com/new/clone?repository-url=https://github.com/$REPO_FULL"

echo "-----------------------------------------"
echo "✅ Репозиторий загружен. Нажмите Deploy на Vercel."
echo "-----------------------------------------"
read -n 1 -s -r -p "Нажмите любую клавишу для выхода..."
