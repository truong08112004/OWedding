#!/bin/sh
set -eu

cd /var/www/html

if [ ! -f .env ] && [ -f .env.example ]; then
    cp .env.example .env
fi

set_env_value() {
    key="$1"
    value="$2"
    if grep -q "^${key}=" .env; then
        sed -i "s|^${key}=.*|${key}=${value}|" .env
    else
        echo "${key}=${value}" >> .env
    fi
}

set_env_value DB_CONNECTION "${DB_CONNECTION:-mysql}"
set_env_value DB_HOST "${DB_HOST:-db}"
set_env_value DB_PORT "${DB_PORT:-3306}"
set_env_value DB_DATABASE "${DB_DATABASE:-owedding}"
set_env_value DB_USERNAME "${DB_USERNAME:-root}"
set_env_value DB_PASSWORD "${DB_PASSWORD:-root}"
set_env_value APP_URL "${APP_URL:-http://localhost:8001}"

mkdir -p storage bootstrap/cache
chmod -R 775 storage bootstrap/cache || true

if [ "${DB_CONNECTION:-}" = "mysql" ]; then
    echo "Waiting for MySQL at ${DB_HOST:-db}:${DB_PORT:-3306}..."
    until php -r "new PDO('mysql:host=' . getenv('DB_HOST') . ';port=' . getenv('DB_PORT') . ';dbname=' . getenv('DB_DATABASE'), getenv('DB_USERNAME'), getenv('DB_PASSWORD'));"; do
        sleep 2
    done
fi

php artisan config:clear
php artisan migrate --force

if [ "${RUN_SEED_ON_START:-false}" = "true" ]; then
    if ! php artisan db:seed --force; then
        echo "Database seeding failed, continuing startup."
    fi
fi

exec php artisan serve --host=0.0.0.0 --port=8000
