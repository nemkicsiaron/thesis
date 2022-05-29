@echo off
cd ..\server
tar -cvzf p2p-pp-server.tar.gz build\* .env prisma\*schema* package* && echo "Server zip created successfully"
move /Y .\p2p-pp-server.tar.gz ..\
cd ..
copy /Y .\p2p-pp-server.tar.gz .\frontend\src\
copy /Y .\p2p-pp-server.tar.gz D:
cd D:
mkdir p2p-pp-server && tar -xvzf p2p-pp-server.tar.gz -C p2p-pp-server && echo "Server extracted successfully"
PAUSE