@echo off
cd ..\server
tar -cvzf p2p-pp-server.tar.gz build\* .env prisma\*schema* package* && echo "Server zip created successfully"
move /Y .\p2p-pp-server.tar.gz ..\p2p-pp-server.tar.gz
cd ..
copy /Y .\p2p-pp-server.tar.gz .\frontend\src\util\p2p-pp-server.tar.gz
PAUSE