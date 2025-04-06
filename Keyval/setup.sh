#responsible for creating voumes and networks

source .env.network
source .env.volume

if [ "$(docker volume ls -q -f name=$VOLUME_NAME)" ]; then
echo "A volume with the name $VOLUME_NAME already exists."
else
echo "Creating volume $VOLUME_NAME..."
docker volume create $VOLUME_NAME
fi

if [ "$(docker network ls -q -f name=$NETWORK_NAME)" ]; then
echo "A volume with the name $NETWORK_NAME already exists."
else
echo "Creating volume $NETWORK_NAME..."
docker network create $NETWORK_NAME
fi