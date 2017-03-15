#!/bin/bash
# delete user.json in order to force reload emotes
# linux-friendly version of killcache.bat
# (c) Ckat 2017-03-15

discordRunning=1
discordCanaryRunning=1
discordPTBRunning=1

echo "Closing any open Discord instances..."
killall -SIGKILL Discord >/dev/null 2>&1 || { discordRunning=0; }
killall -SIGKILL DiscordCanary >/dev/null 2>&1 || { discordCanaryRunning=0; }
killall -SIGKILL DiscordPTB >/dev/null 2>&1 || { discordCanaryRunning=0; }

echo "Removing cache..."
sudo rm $(sudo find / | grep "BetterDiscord/user.json")

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
