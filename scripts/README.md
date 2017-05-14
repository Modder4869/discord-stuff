# scripts
Some bd scripts for linux systems

## tape.sh
A very basic install script to install bd, should get the job done most of the time

usage: tape.sh (give directory or fill in later)

deps: nodejs (for asar install), wget, linux

for a more featureful implementation which can also install discord and beautiful discord check out [discorddownloader](https://github.com/simoniz0r/discorddownloader)

## killcache.sh
Similar to killcache.bat for windows found in the server, force reload emotes, needed sometimes when they break

## uninstall.bat
uninstall bd for windows, defaults to discord, specify ptb or canary to uninstall from those
usage: 

    uninstall.bat
    uninstall.bat ptb
    uninstall.bat canary
