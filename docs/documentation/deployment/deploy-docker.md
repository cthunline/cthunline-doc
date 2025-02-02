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

Check the [.env.sample file from the repository](https://github.com/cthunline/cthunline-api/blob/master/.env.sample).
