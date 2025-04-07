#1 stop and remove the container
source .env.db
source .env.network
source .env.volume

if [ "$(docker ps -q -f name=$DB_CONTAINER_NAME)" ]; then
    docker kill $DB_CONTAINER_NAME
    echo "Container $DB_CONTAINER_NAME killed."
else
     echo "container called $DB_CONTAINER_NAME does not exist."
     exit 1
fi

if [ "$(docker volume ls -q -f name=$VOLUME_NAME)" ]; then
    docker volume rm $VOLUME_NAME
    echo "Volume $VOLUME_NAME removed."
else
    echo "volume $VOLUME_NAME does not exist"
fi


if [ "$(docker network ls -q -f name=$NETWORK_NAME)" ]; then
    docker network rm $NETWORK_NAME
    echo "Network $NETWORK_NAME removed."
else
    echo "network $NETWORK_NAME des not exist"
fi