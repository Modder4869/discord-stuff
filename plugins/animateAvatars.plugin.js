//META{"name":"animateAvatars"}*//
var animateAvatars = function(){};

animateAvatars.animatePics = function(){
    // worst possible way to stop it from pausing on hover out,
    // call entire function again on hovering out of any message
    $('.message-group').each(function(){
        $(this).attr('onmouseout', "animateAvatars.animatePics();");
    });

    // go over every avatar, check if its an animated one, replace jpg with 'high quality' gif,
    // run this everywhere so they get replaced all the time
    $('.avatar-small').each(function(){
        if(~$(this).attr('style').indexOf('a_'))
            $(this).attr('style', $(this).attr('style').replace('.jpg', '.gif?size=1024'));
    });
    $('.avatar-large').each(function(){
        if(~$(this).attr('style').indexOf('a_'))
            $(this).attr('style', $(this).attr('style').replace('.jpg', '.gif?size=1024'));
    });
};

animateAvatars.prototype.onMessage = function(){
    animateAvatars.animatePics();
};
animateAvatars.prototype.onSwitch = function(){
    animateAvatars.animatePics();
};
animateAvatars.prototype.start = function(){
    animateAvatars.animatePics();
};
animateAvatars.prototype.load = function(){};
animateAvatars.prototype.unload = function(){};
animateAvatars.prototype.stop = function(){};
animateAvatars.prototype.getSettingsPanel = function(){
    return "";
};
animateAvatars.prototype.getName = function(){
    return "Always Animated Avatars";
};
animateAvatars.prototype.getDescription = function(){
    return "Terribly inefficient way to always animate avatars, which is also terribly inefficient. enjoy";
};
animateAvatars.prototype.getVersion = function(){
    return "0.0.1";
};
animateAvatars.prototype.getAuthor = function(){
    return "Catblaster/Ckath";
};
