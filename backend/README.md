# Пак

Backend для [пак.укр](https://пак.укр).

## Розробка

### Вимоги

- Node.js
- Docker
- Docker Compose

```shell
cp .env.example .env
npm install
docker-compose up -d
npm run dev/db:main:migrate
npm run dev/api:run
```

## Випуск

### Вимоги

- Ubuntu 22.04
- Node.js 21
- PostgreSQL
- nginx
- systemctl
- certbot

### Встановлення

...