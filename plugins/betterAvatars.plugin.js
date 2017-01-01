//META{"name":"betterAvatars"}*//
var betterAvatars = function(){};

betterAvatars.animatePics = function(){
    // worst possible way to stop it from pausing on hover out,
    // call entire function again on hovering out of any message
    $('.message-group').each(function(){
        $(this).attr('onmouseout', "betterAvatars.animatePics();");
    });

    // go over every avatar, check if its an animated one, replace jpg with gif,
    // run this everywhere so they get replaced all the time
    $('.avatar-large').each(function(){
        // animated avatar
        if(~$(this).attr('style').indexOf('a_'))
            $(this).attr('style', $(this).attr('style').replace('.jpg', '.gif?size=1024'));
        // normal avatar
        else
            $(this).attr('style', $(this).attr('style').replace('.jpg', '.webp?size=1024'));

    });
};

betterAvatars.prototype.onMessage = function(){
    betterAvatars.animatePics();
};
betterAvatars.prototype.onSwitch = function(){
    betterAvatars.animatePics();
};
betterAvatars.prototype.start = function(){
    betterAvatars.animatePics();
};
betterAvatars.prototype.load = function(){};
betterAvatars.prototype.unload = function(){};
betterAvatars.prototype.stop = function(){};
betterAvatars.prototype.getSettingsPanel = function(){
    return "";
};
betterAvatars.prototype.getName = function(){
    return "slightly Better Avatars";
};
betterAvatars.prototype.getDescription = function(){
    return "Terribly inefficient way to replace avatars with higher quality versions and auto-animate nitro avatars, which is also terribly inefficient. enjoy";
};
betterAvatars.prototype.getVersion = function(){
    return "0.0.1";
};
betterAvatars.prototype.getAuthor = function(){
    return "Catblaster/Ckath";
};
