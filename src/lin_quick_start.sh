#!/bin/sh
cd "./frontend"
npm run start &
cd "../aggregator"
(npm run demon || npm run start ) &
cd "../server"
(npm run demon || npm run start ) &