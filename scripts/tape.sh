#!/bin/sh
# simple script to install bd
# first argument can be discord directory
# deps: nodejs (for asar install), sed, wget, unzip
# (c) Ckat 2017-02-03
# Changes by simonizor 2017-02-04

if [[ -z "$1" ]]; then
    echo -n "Input the directory you would like to install BetterDiscord to and press [ENTER]"
    read DIR
else
    DIR=$1
fi
if [[ "$DIR" != /* ]]; then
	echo "Invalid directory.  Exiting."
	exit 1
fi
if [ "${DIR: -1}" = "/" ]; then
	DIR="${DIR::-1}"
fi

echo "Installing BetterDiscord to" "$DIR" "..."
echo "Closing any open Discord instances..."
killall -SIGKILL Discord
killall -SIGKILL DiscordCanary
killall -SIGKILL DiscordPTB

echo "Cleaning old install..."
sudo rm /tmp/bd.zip
sudo rm -rf /tmp/bd
	
echo "Installing asar..."
sudo npm install asar -g

echo "Downloading BetterDiscord..."
wget -O /tmp/bd.zip https://github.com/Jiiks/BetterDiscordApp/archive/stable16.zip

echo "Preparing BetterDiscord files..."
unzip /tmp/bd.zip 
sudo mv ./BetterDiscordApp-stable16 /tmp/bd
sudo mv /tmp/bd/lib/Utils.js /tmp/bd/lib/utils.js
sed -i "s/'\/var\/local'/process.env.HOME + '\/.config'/g" /tmp/bd/lib/BetterDiscord.js
sed -i "s/bdstorage/bdStorage/g" /tmp/bd/lib/BetterDiscord.js

echo "Removing app folder from Discord directory..."
sudo rm -rf "$DIR/resources/app"

echo "Unpackin Discord asar..."
sudo asar e "$DIR/resources/app.asar" "$DIR/resources/app"

echo "Preparing Discord files..."
sed "/_fs2/ a var _betterDiscord = require('betterdiscord'); var _betterDiscord2;" "$DIR/resources/app/index.js" > /tmp/bd/index.js
sudo mv /tmp/bd/index.js "$DIR/resources/app/index.js"
sed "/mainWindow = new/ a _betterDiscord2 = new _betterDiscord.BetterDiscord(mainWindow);" "$DIR/resources/app/index.js" > /tmp/bd/index.js
sudo mv /tmp/bd/index.js "$DIR/resources/app/index.js"

echo "Finishing up..."
sudo mv /tmp/bd "$DIR/resources/app/node_modules/betterdiscord"
