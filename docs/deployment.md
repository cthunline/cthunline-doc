# Deployment

## Database

Cthunline uses [MongoDB](https://www.mongodb.com/) as database, and [Prisma](https://www.prisma.io/) as ORM.

This means two things:

* You must setup a MongoDB instance alongside the app
* This MongoDB instance has to be configured as a replica set
  * Yes, even for a single node deployment, that's a Prisma requirement

Setting up a MongoDB replica set is not so hard but can be a hustle for people that are not used to it.

The [Bitnami MongoDB Docker image](https://github.com/bitnami/bitnami-docker-mongodb) provides an easy way of deploying a replicat set using Docker.

Otherwise, you can do it youself, here is an example of `docker-compose.yaml` that you can use as a starting point:

```yaml
version: '3'

services:
  mongo:
    image: mongo
    container_name: mongo
    restart: on-failure
    environment:
      - MONGO_INITDB_ROOT_USERNAME=${MONGO_INITDB_ROOT_USERNAME}
      - MONGO_INITDB_ROOT_PASSWORD=${MONGO_INITDB_ROOT_PASSWORD}
    volumes:
      - mongo_data:/data/db
      - mongo_keyfile:/data/keyfile
      ### Uncomment on first run so the keyFile can be grabbed by the container
      # - /etc/mongodb:/opt/keyFile
    networks:
      - mongo-network
    ports:
      - 27017:27017
    ### Uncomment on first run to initialize the replica set
    # healthcheck:
    #  test: test $$(echo 'rs.initiate({_id:"rs0",members:[{_id:0,host:"mongo"}]}).ok || rs.status().ok' | mongo -u $${MONGO_INITDB_ROOT_USERNAME} -p $${MONGO_INITDB_ROOT_PASSWORD} --quiet) -eq 1
    #  interval: 10s
    #  start_period: 30s
    ### Uncomment on first run to grab keyFile and copy it in a container directory
    # entrypoint:
    #  - bash
    #  - -c
    #  - |
    #    cp /opt/keyFile/keyFile /data/keyfile/mongodb.key
    #    chmod 400 /data/keyfile/mongodb.key
    #    chown 999:999 /data/keyfile/mongodb.key
    #    exec docker-entrypoint.sh $$@
    command: '--bind_ip_all --auth --replSet rs0 --keyFile /data/keyfile/mongodb.key'

volumes:
  mongo_data:
  mongo_keyfile:

networks:
  mongo-network:
    name: mongo
    internal: true
```

## Docker

Cthunline can be easily deployed using Docker images.

You will find below an example of `docker-compose.yaml` file and its `.env` companion.

Edit configuration as you wish then use `docker-compose up -d` to run the container.

### docker-compose.yml

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

### .env

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

## Reverse proxy

When deploying Cthunline in production, it's convenient to have a reverse proxy distributing the app.

Here is an example of a Nginx configuration that you can use to serve the app:

```nginx
server {
  listen 80;
  listen [::]:80;
  server_name my.cthunline.app;
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl http2;
  server_name my.cthunline.app;
  ssl_certificate /path/to/ssl/fullchain.pem;
  ssl_certificate_key /path/to/ssl/privkey.pem;
  location / {
    proxy_pass http://127.0.0.1:8080;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Upgrade $http_upgrade;
    proxy_cache_bypass $http_upgrade;
  }
}
```
