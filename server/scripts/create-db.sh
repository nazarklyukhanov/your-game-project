#!/bin/bash

# Скрипт для создания базы данных PostgreSQL из DATABASE_URL
# Загружаем .env
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Парсим DATABASE_URL
# Формат: postgresql://user:password@host:port/database
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL не найден в .env файле"
    exit 1
fi

# Извлекаем имя базы данных из DATABASE_URL
DB_NAME=$(echo $DATABASE_URL | sed -n 's/.*\/\([^?]*\).*/\1/p')

if [ -z "$DB_NAME" ]; then
    echo "❌ Не удалось извлечь имя базы данных из DATABASE_URL"
    echo "DATABASE_URL: $DATABASE_URL"
    exit 1
fi

# Извлекаем пользователя из DATABASE_URL
DB_USER=$(echo $DATABASE_URL | sed -n 's|postgresql://\([^:]*\):.*|\1|p')
DB_HOST=$(echo $DATABASE_URL | sed -n 's|.*@\([^:]*\):.*|\1|p')
DB_PORT=$(echo $DATABASE_URL | sed -n 's|.*:\([0-9]*\)/.*|\1|p')

echo "📦 Создание базы данных: $DB_NAME"
echo "👤 Пользователь: $DB_USER"
echo "🖥️  Хост: ${DB_HOST:-localhost}"
echo "🔌 Порт: ${DB_PORT:-5432}"

# Проверяем существование базы данных
if psql "$DATABASE_URL" -lqt 2>/dev/null | cut -d \| -f 1 | grep -qw "$DB_NAME"; then
    echo "✅ База данных '$DB_NAME' уже существует!"
    exit 0
fi

# Создаем базу данных через psql
# Подключаемся к системной базе postgres и создаем нашу базу
PGPASSWORD=$(echo $DATABASE_URL | sed -n 's|postgresql://[^:]*:\([^@]*\)@.*|\1|p')
SYSTEM_URL=$(echo $DATABASE_URL | sed "s|/$DB_NAME|/postgres|")

export PGPASSWORD

createdb -h "${DB_HOST:-localhost}" -p "${DB_PORT:-5432}" -U "$DB_USER" "$DB_NAME" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ База данных '$DB_NAME' успешно создана!"
else
    echo "❌ Ошибка при создании базы данных"
    echo "Попробуйте вручную:"
    echo "  createdb -h ${DB_HOST:-localhost} -p ${DB_PORT:-5432} -U $DB_USER $DB_NAME"
    echo "Или через psql:"
    echo "  psql -h ${DB_HOST:-localhost} -p ${DB_PORT:-5432} -U $DB_USER -d postgres -c 'CREATE DATABASE $DB_NAME;'"
    exit 1
fi
