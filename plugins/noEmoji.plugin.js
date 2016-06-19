//META{"name":"noEmoji"}*//
var noEmoji = function(){};
noEmoji.prototype.convert = function(){
    $(".message img").each(function(){
        var text = $(this);
        // identify emojis by lack of href, check for .svg src to exclude emotes
        if(text.attr("href") != undefined || !text.attr("src").endsWith(".svg"))
            return true
        else
            text.replaceWith(text.attr("alt"))
    });
};

noEmoji.prototype.onMessage = function(){
    setTimeout(this.convert(), 2000);
};
noEmoji.prototype.onSwitch = function(){
    this.convert();
};
noEmoji.prototype.start = function(){
    this.convert();
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
    return "0.1";
};
noEmoji.prototype.getAuthor = function(){
    return "Catblaster/Ckath";
};