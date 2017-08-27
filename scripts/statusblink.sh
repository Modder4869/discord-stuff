#!/bin/bash
# professional annoying status blinker, just add token
# cate 27/8/2017

TOKEN="put_token_here"

function setStatus {
    curl -s -X PATCH -H "authorization: $TOKEN" -H "Content-Type: application/json" \
    -d "{ \"status\": \"$1\" }" "https://canary.discordapp.com/api/v6/users/@me/settings" > /dev/null
}

for((;;)); do
    setStatus "online"
    sleep 1
    setStatus "idle"
    sleep 1
done
