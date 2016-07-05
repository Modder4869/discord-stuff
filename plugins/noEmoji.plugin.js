//META{"name":"noEmoji"}*//
var noEmoji = function(){};
noEmoji.prototype.replace = function(){
    $(".emoji").each(function(){
        var text = $(this);
        text.replaceWith(text.attr("alt"));
    });
};

noEmoji.prototype.onMessage = function(){
    this.replace();
};
noEmoji.prototype.onSwitch = function(){
    this.replace();
};
noEmoji.prototype.start = function(){
    this.replace();
};
noEmoji.prototype.load = function(){};
noEmoji.prototype.unload = function(){};
noEmoji.prototype.stop = function(){};
noEmoji.prototype.getSettingsPanel = function(){
    return "";
};
noEmoji.prototype.getName = function(){
    return "No Emoji";
};
noEmoji.prototype.getDescription = function(){
    return "Replaces emoji pics with whatever is in their alt attribute,  most of the time the symbol version of emoji.";
};
noEmoji.prototype.getVersion = function(){
    return "0.2.0";
};
noEmoji.prototype.getAuthor = function(){
    return "Catblaster/Ckath";
};