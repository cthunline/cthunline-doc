# Docker deployment

Cthunline can be easily deployed using Docker images.

You will find below an example of `docker-compose.yaml` file and its `.env` companion.

Edit configuration as you wish then use `docker compose up -d` (or `docker-compose up -d` for older versions) to run the container.

## docker-compose.yml

```yaml
version: '3'

services:
    cthunline:
        image: cthunline/cthunline
        container_name: cthunline
        restart: always
        env_file:
            - .env
        volumes:
            - cthunline_assets:/data/assets
            - cthunline_logs:/data/logs
        networks:
            - cthunline-network
        ports:
            - 8080:8080
            # if your container is served by a reverse proxy then bind to localhost only
            # - 127.0.0.1:8080:8080
    postgresql:
        image: postgres
        container_name: postgresql
        restart: always
        networks:
            - cthunline-network
        volumes:
            - postgresql_data:/var/lib/postgresql/data
        environment:
            POSTGRES_USER: username
            POSTGRES_PASSWORD: password
    keydb:
        image: eqalpha/keydb
        container_name: keydb
        restart: always
        networks:
            - cthunline-network

volumes:
    cthunline_assets:
    cthunline_logs:

networks:
    cthunline-network:
        name: cthunline
```

## .env

```bash
#
# App
#
# Credentials for the default user
DEFAULT_ADMIN_NAME=admin
DEFAULT_ADMIN_EMAIL=admin@admin.com
DEFAULT_ADMIN_PASSWORD=cthunline
# If registration is enabled
REGISTRATION_ENABLED=true
# (optional) If registering must require an invitation code
INVITATION_ENABLED=true
# Default theme (dark or light)
DEFAULT_THEME=dark
# Default language
DEFAULT_LOCALE=en
#
# Server
#
# Environment (prod or dev)
# If prod, client build will be served by the server
# If dev, backend server and front client are run separately
ENVIRONMENT=prod
# Server port
PORT=8080
# JWT secret
JWT_SECRET=abcdef1234567890abcdef1234567890
# Secret used to encrypt data
CRYPTO_SECRET=abcdef1234567890abcdef1234567890
# Cookie signing secret
COOKIE_SECRET=abcdef123456789abcdef123456789
# If cookies must be secured (HTTPS only)
COOKIE_SECURE=true
# Log level (info, warning or error)
LOG_LEVEL=info
# (optional) Directory in which logs are stored
# If omitted logs will only appear in console
LOG_DIR=/var/log/cthunline
# If server is behind a revese proxy
REVERSE_PROXY=true
# Rate limiter options (protects login and registration endpoints)
# Window duration in minutes
RL_WINDOW_DURATION=10
# Maximum number of requests per window
RL_MAX_REQUESTS=100
#
# Database
#
# PostgreSQL connection URL
DATABASE_URL=postgresql://username:password@postgresql:5432/database
##
## Cache (KeyDB is recommanded but Redis should also work)
##
# KeyDB/Redis server host
CACHE_HOST=keydb
# KeyDB/Redis server port
CACHE_PORT=6379
# KeyDB/Redis database name (integer)
CACHE_DATABASE=0
# KeyDB/Redis password (optional)
#CACHE_PASSWORD=abc123
#
# Assets
#
# Directory in which assets are uploaded (images and audio)
ASSET_DIR=/path/to/assets
# Maximum upload size in Mb (total)
ASSET_MAX_SIZE_MB=100
# Maximum upload size per file in Mb
ASSET_MAX_SIZE_MB_PER_FILE=20
# Maximum character portrait size in Mb
PORTRAIT_MAX_SIZE_MB=2
```
