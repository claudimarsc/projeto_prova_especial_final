docker pull mongo

docker run --name mongo -p 127.0.0.1:27017:27017 -p 127.0.0.1:28017:28017 -d mongo