#!/bin/sh
cd "../server"
tar -cvzf p2p-pp-server.tar.gz build/* .env prisma/*schema* package* && echo "Server zip created successfully"
mv -f ./p2p-pp-server.tar.gz ..
cd ..
cp -f ./p2p-pp-server.tar.gz ./frontend/src/
cp -f ./p2p-pp-server.tar.gz C:/
cd C:/ && tar -xvzf p2p-pp-server.tar.gz -C p2p-pp-server && echo "Server extracted successfully"