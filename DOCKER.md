# Docker Setup for Nova API + MariaDB

## Quick Start

Run the entire stack (MariaDB database + Express API) with:

```bash
docker compose up --build
```

This will:

1. Build the API image from `Dockerfile.api`
2. Start a MariaDB container with the migrations from `./migrations`
3. Expose the API on `http://localhost:3000`
4. Expose the database on `localhost:3306`

## Components

### Dockerfile.api

Multi-stage Docker build for the Express API:

- **Builder stage**: Installs all dependencies (dev + prod) and runs `npm run build:only`
  to compile TypeScript
- **Runtime stage**: Copies only built artifacts and production dependencies, running on
  Node 20 Alpine

### docker-compose.yml

Orchestrates two services:

- **db**: MariaDB LTS image with initialized schema from `./migrations/*.sql`
- **api**: The Express application, connected to the database via `db` hostname

## Environment Variables

The API reads the following environment variables (set in `docker-compose.yml`):

- `DB_HOST`: Database hostname (set to `db` in compose)
- `DB_PORT`: Database port (default `3306`)
- `DB_NAME`: Database name (default `nova`)
- `DB_USER`: Database user (default `nova_user`)
- `DB_PASSWORD`: Database password (default `nova_password`)
- `NODE_ENV`: Set to `production` in compose

Update these in `docker-compose.yml` as needed for your environment.

## Development vs Production

### Development

To use with source code mounted and watch mode:

```bash
# Edit docker-compose.yml: change `api` service command to:
# CMD ["npm", "run", "dev"]
# And add a volume: - ./src:/usr/src/app/src
```

### Production

Use the provided setup as-is. The compiled `dist/` is copied into the image and served via
`node dist/index.js`.

## Database Initialization

SQL files in `./migrations/` are automatically run when the database starts (via
`docker-entrypoint-initdb.d`).

To run migrations manually or later:

```bash
docker exec nova-db mariadb -u nova_user -pnova_password -D nova < migrations/00010_create_table_organisations.sql
```

## Stopping the Stack

```bash
docker compose down
```

To remove volumes (clears database):

```bash
docker compose down -v
```

## Logs

View API logs:

```bash
docker compose logs api
```

View database logs:

```bash
docker compose logs db
```

Follow all logs:

```bash
docker compose logs -f
```

## Rebuilding

If you change the API code, rebuild:

```bash
docker compose up --build
```

If you only changed migrations, restart without rebuilding:

```bash
docker compose restart db
```
