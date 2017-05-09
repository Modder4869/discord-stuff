#!/bin/bash
# simple script to install bd
# first argument can be discord directory
# deps: nodejs (for asar install), wget
# (c) Ckat 2017-02-03
# Changes by simonizor 2017-02-04
# Last updated: 2017-05-09 (Ckat)

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

echo "Checking deps..."
npmIsInstalled=1
nodejsIsInstalled=1
wgetIsInstalled=1
asarIsInstalled=1
asarIsInstalledCorrectly=1
type npm >/dev/null 2>&1 || { npmIsInstalled=0; }
type node >/dev/null 2>&1 || { nodejsIsInstalled=0; }
type wget >/dev/null 2>&1 || { wgetIsInstalled=0; }
type asar >/dev/null 2>&1 || { asarIsInstalled=0; }

if [ "$npmIsInstalled" = "0" ]; then
    echo "npm not found, unable to continue"
    exit 1
fi
if [ "$nodejsIsInstalled" = "0" ]; then
    echo "nodejs not found, unable to continue"
    exit 1
fi
if [ "$wgetIsInstalled" = "0" ]; then
    echo "wget not found, unable to continue"
    exit 1
fi
if [ "$asarIsInstalled" = "0" ]; then
    echo "Installing asar..."
    sudo npm install asar -g

    type asar >/dev/null 2>&1 || { asarIsInstalledCorrectly=0; }
    if [ "$asarIsInstalledCorrectly" = "0" ]; then
        echo "failed to install asar, unable to continue"
        exit 1
    fi
fi

echo "Installing BetterDiscord to" "$DIR" "..."

discordRunning=1
discordCanaryRunning=1
discordPTBRunning=1
echo "Closing any open Discord instances..."
killall -SIGKILL Discord >/dev/null 2>&1 || { discordRunning=0; }
killall -SIGKILL DiscordCanary >/dev/null 2>&1 || { discordCanaryRunning=0; }
killall -SIGKILL DiscordPTB >/dev/null 2>&1 || { discordPTBRunning=0; }

echo "Removing app folder from Discord directory..."
sudo rm -rf "$DIR/resources/app"

echo "Unpacking Discord asar..."
sudo asar e "$DIR/resources/app.asar" "$DIR/resources/app"

echo "Preparing Discord files..."
sed "/_fs2/ a var _betterDiscord = require('betterdiscord'); var _betterDiscord2;" "$DIR/resources/app/index.js" > /tmp/bdindex.js
sudo mv /tmp/bdindex.js "$DIR/resources/app/index.js"
sed "/mainWindow = new/ a _betterDiscord2 = new _betterDiscord.BetterDiscord(mainWindow);" "$DIR/resources/app/index.js" > /tmp/bdindex.js
sudo mv /tmp/bdindex.js "$DIR/resources/app/index.js"
sudo mkdir -p "$DIR/resources/app/node_modules/betterdiscord/lib"

echo "Downloading BetterDiscord files..."
sudo wget -O "$DIR/resources/app/node_modules/betterdiscord/betterdiscord.js" https://raw.githubusercontent.com/Jiiks/BetterDiscordApp/master/betterdiscord.js
sudo wget -O "$DIR/resources/app/node_modules/betterdiscord/package.json" https://raw.githubusercontent.com/Jiiks/BetterDiscordApp/master/package.json
sudo wget -O "$DIR/resources/app/node_modules/betterdiscord/lib/BetterDiscord.js" https://raw.githubusercontent.com/Jiiks/BetterDiscordApp/master/lib/BetterDiscord.js
sudo wget -O "$DIR/resources/app/node_modules/betterdiscord/lib/Utils.js" https://raw.githubusercontent.com/Jiiks/BetterDiscordApp/master/lib/Utils.js
sudo wget -O "$DIR/resources/app/node_modules/betterdiscord/lib/config.json" https://raw.githubusercontent.com/Jiiks/BetterDiscordApp/master/lib/config.json

echo "Instalation done, restarting any closed clients..."

if [ "$discordRunning" = "1" ]; then
    echo "Starting discord..."
    discord>/dev/null&
fi
if [ "$discordCanaryRunning" = "1" ]; then
    echo "Starting discord-canary..."
    discord-canary>/dev/null&
fi
if [ "$discordPTBRunning" = "1" ]; then
    echo "Starting discord-ptb..."
    discord-ptb>/dev/null&
fi
