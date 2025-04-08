
source .env.db

#connectivity
LOCALHOST_PORT=3000
CONTAINER_PORT=3000
source .env.network
BACKEND_CONTAINER_NAME="backend"
BACKEND_IMAGE_NAME="key-value-backend"
MONGODB_HOST="mdb"

if [ "$(docker ps -aq -f name=$BACKEND_CONTAINER_NAME)" ]; then
    echo "A container with the name $BACKEND_CONTAINER_NAME already exists."
     echo "kill container called $BACKEND_CONTAINER_NAME first."
     exit 1
fi

docker build -t key-value-backend \
 -f backend/Dockerfile.dev $BACKEND_CONTAINER_NAME

 docker run -d --rm --name $BACKEND_CONTAINER_NAME  \
 -e KEY_VALUE_DB=$KEY_VALUE_DB \
 -e KEY_VALUE_USER=$KEY_VALUE_USER \
 -e KEY_VALUE_PASSWORD=$KEY_VALUE_PASSWORD \
 -e PORT=$CONTAINER_PORT \
 -e MONGODB_HOST=$MONGODB_HOST \
 -p $LOCALHOST_PORT:$CONTAINER_PORT \
 -v $(pwd)/backend:/app\
 --network $NETWORK_NAME \
 $BACKEND_IMAGE_NAME


