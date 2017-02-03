#!/bin/sh
# simple script to install bd
# first argument should be discord directory
# deps: nodejs asar(install through npm install -g asar), sed, wget, unzip
# (c) Ckat 2017-02-03

ROOT_UID="0"
[ -z "$1" ] && echo "error: No discord directory supplied" && exit 1
[ "$UID" -ne "$ROOT_UID" ] && echo "error: Insufficient permissions, try to run with sudo or as root" && exit 1

echo "=> closing discord instances"
killall -SIGKILL Discord
killall -SIGKILL DiscordCanary
killall -SIGKILL DiscordPTB

echo "=> cleaning up install remains"
rm /tmp/bd.zip
rm -rf /tmp/bd

echo "=> downloading files"
wget -O /tmp/bd.zip https://github.com/Jiiks/BetterDiscordApp/archive/stable16.zip

echo "=> preparing betterdiscord files"
unzip /tmp/bd.zip 
mv ./BetterDiscordApp-stable16 /tmp/bd
mv /tmp/bd/lib/Utils.js /tmp/bd/lib/utils.js
sed -i "s/'\/var\/local'/process.env.HOME + '\/.config'/g" /tmp/bd/lib/BetterDiscord.js

echo "=> removing old app folder"
rm -rf "$1/resources/app"

echo "=> unpacking discord asar"
asar e "$1/resources/app.asar" "$1/resources/app"

echo "=> preparing discord files"
sed "/_fs2/ a var _betterDiscord = require('betterdiscord'); var _betterDiscord2;" "$1/resources/app/index.js" > /tmp/bd/index.js
mv /tmp/bd/index.js "$1/resources/app/index.js"
sed "/mainWindow = new/ a _betterDiscord2 = new _betterDiscord.BetterDiscord(mainWindow);" "$1/resources/app/index.js" > /tmp/bd/index.js
mv /tmp/bd/index.js "$1/resources/app/index.js"

echo "=> finishing up"
mv /tmp/bd "$1/resources/app/node_modules/betterdiscord"
