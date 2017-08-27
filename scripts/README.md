# scripts
Some scripts

## tape.sh
A very basic install script to install bd, should get the job done most of the time
either give directory as argument or fill it in prompt later

usage: 

    tape.sh (no arguments, discord directory)

deps: nodejs (for asar install), wget, linux

for a more featureful implementation which can also install discord and beautiful discord check out [discorddownloader](https://github.com/simoniz0r/discorddownloader)

## killcache.sh
Similar to killcache.bat for windows found in the server, force reload emotes, needed sometimes when they break. run with -f to look for directory anywhere on disk, no arguments will default to ~/.config/BetterDiscord

usage:

    killcache.sh (no arguments, -f)

## uninstall.bat
uninstall bd for windows, defaults to discord, specify ptb or canary to uninstall from those

usage: 

    uninstall.bat (no arguments, ptb, canary)

## statusblink.sh
professional annoying status blinker, just set token variable in file

usage: 
    
    statusblink.sh
