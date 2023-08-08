#!/bin/sh

mongo \
    -u ${MONGO_INITDB_ROOT_USERNAME} \
    -p ${MONGO_INITDB_ROOT_PASSWORD} \
    --authenticationDatabase admin ${MONGO_INITDB_DATABASE} \
<<-EOJS
db.createUser({
    user: "${MONGO_INITDB_USER}",
    pwd: "${MONGO_INITDB_PWD}",
    roles: [{
        role: "readWrite",
        db: "${MONGO_INITDB_DATABASE}"
    }],
    mechanisms: ["${MONGO_AUTH}"],
})
EOJS