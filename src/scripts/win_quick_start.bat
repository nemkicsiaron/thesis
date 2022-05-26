@echo off
cd "..\frontend"
start "Frontend" /min npm start
cd "..\aggregator"
start "Aggregator" /min npm run demon
cd "..\server"
start "Server" /min npm run demon
echo "Everything started in watch mode"
PAUSE