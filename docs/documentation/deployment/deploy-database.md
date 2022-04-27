# Database

Cthunline uses [MongoDB](https://www.mongodb.com/) as a database, and [Prisma](https://www.prisma.io/) as an ORM.

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
