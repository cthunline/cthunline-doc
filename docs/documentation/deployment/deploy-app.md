# Deploy the app

Cthunline can be easily deployed using Docker images.

You will find below an example of `docker-compose.yaml` file and its `.env` companion.

Edit configuration as you wish then use `docker-compose up -d` to run the container.

## docker-compose.yml

```yaml
version: '3'

services:
  cthunline:
    image: cthunline
    container_name: cthunline
    restart: always
    env_file:
      - .env
    volumes:
      - cthunline_assets:/data/assets
      - cthunline_logs:/data/logs
    networks:
      - cthunline-network
      - mongo-network
    ports:
      - 8080:8080

volumes:
  cthunline_assets:
  cthunline_logs:

networks:
  cthunline-network:
    name: cthunline
  mongo-network:
    name: mongo
    external: true
```

## .env

```shell
#
# App
#
# Credentials for the default user
DEFAULT_ADMIN_NAME=admin
DEFAULT_ADMIN_EMAIL=admin@admin.com
DEFAULT_ADMIN_PASSWORD=cthunline
# If registration is enabled
REGISTRATION_ENABLED=1
# (optional) If registering must require an invitation code
INVITATION_ENABLED=1
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
ENVIRONMENT=dev
# Server port
PORT=8080
# JWT secret
JWT_SECRET=fgEP2a5pkgdABCwQWrdLERw4Z5sJ9Ekf
# Cookie signing secret
COOKIE_SECRET=3z9R8WDHySkqtN2HdeegcpDYW5pKz5ty
# If cookies must be secured (HTTPS only)
COOKIE_SECURE=true
# If logs are enabled
LOG_ENABLED=1
# (optional) Directory in which logs are stored
# If omitted logs will only appear in console
LOG_DIR=/var/log/cthunline
#
# Database
#
# (optional) Disable Prisma telemetry
# It's very much recommanded as we don't like telemetry bullshit in here
CHECKPOINT_DISABLE=1
# MongoDB connection URL
MONGO_URL=mongodb://username:password@localhost:27017/database
#
# Assets
#
# Directory in which assets are uploaded (images and audio)
ASSET_DIR=/path/to/assets
```
