//META{"name":"noEmoji"}*//
var noEmoji = function(){};
noEmoji.prototype.convert = function(){
    $(".message img").each(function(){
        var text = $(this);
        // identify emojis by lack of href, check for .svg src to exclude emotes
        if(text.attr("href") != undefined || !text.attr("src").endsWith(".svg") || text.attr("src").endsWith("d72f52ce6c418c5c8fd5faac0e8c36ff.svg") || 
        text.attr("src").endsWith("d72f52ce6c418c5c8fd5faac0e8c36ff.svg") || text.attr("src").endsWith("86c36b8437a0bc80cf310733f54257c2.svg"))
            return true
        else
            text.replaceWith(text.attr("alt"))
    });
};

noEmoji.prototype.onMessage = function(){
    this.convert();
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
    return "0.1.1";
};
noEmoji.prototype.getAuthor = function(){
    return "Catblaster/Ckath";
};