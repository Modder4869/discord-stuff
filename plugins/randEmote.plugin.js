//META{"name":"randEmote"}*//
var cat_token;
var randEmote = function () {};
var emoteArray = [];
var eModifiers = [':shake', ':shake2', ':shake3', ':spin', ':spin2', ':spin3', ':1spin', ':2spin', ':3spin', ':pulse'];
randEmote.prototype.start = function () {
    try{
        const cat_iframe = document.createElement('iframe'); cat_iframe.style.display = 'none'; 
        document.body.appendChild(cat_iframe); 
        cat_token = cat_iframe.contentWindow.localStorage.token;
    }catch(e){ console.warn("randEmote: failed to attach iframe and set token: " + e); }

    this.attachParser();
    this.observer = function(e) {
        if (!e.addedNodes.length || !(e.addedNodes[0] instanceof Element)) return;

        var elem = e.addedNodes[0];

        if (elem.querySelector(".textArea-20yzAH")) {
            this.attachParser();
        }
    }
    for(var k in emotesTwitch) emoteArray.push(k);
    for(var k in subEmotesTwitch) emoteArray.push(k);
    for(var k in emotesFfz) emoteArray.push(k);
    for(var k in emotesBTTV) emoteArray.push(k);
    for(var k in emotesBTTV2) emoteArray.push(k);
    console.log('randEmote: loaded ' + emoteArray.length + ' emotes');
};
randEmote.prototype.onSwitch = function () {
    this.attachParser();
}
randEmote.prototype.attachParser = function(){
    var el = $('.textArea-20yzAH');
    if (el.length == 0) return;
    this.handleKeypress = function (e) {
        var code = e.keyCode || e.which;
        if(code !== 13) return;
        var text;
	try{var val = $('.textArea-20yzAH').val();
    if(val.startsWith('/emotem')){
	    var arg = val.split(' ');
	    if(arg[1] == undefined || isNaN(arg[1]))
		    randEmote.sendMsg(emoteArray[Math.floor(Math.random()*emoteArray.length)] + eModifiers[Math.floor(Math.random()*eModifiers.length)]);
	    else
		    randEmote.sendMsg(randEmote.getEmote(arg[1], true));
	    e.preventDefault();
	    e.stopPropagation();
	    return;
	}
    else if(val.startsWith('/emote')){
	    var arg = val.split(' ');
	    if(arg[1] == undefined || isNaN(arg[1]))
		    randEmote.sendMsg(emoteArray[Math.floor(Math.random()*emoteArray.length)]);
	    else
		    randEmote.sendMsg(randEmote.getEmote(arg[1], false));
	    $(this).val("");
	    e.preventDefault();
	    e.stopPropagation();
	    return;
	}
    
	}catch(e){ console.warn("randEmote: unable to attach to textarea: " + e); }
    };
    el[0].addEventListener("keydown", this.handleKeypress, false);
};
randEmote.getEmote = function(n, modifiers){
    var emoteStr = "";
    if(modifiers)
        for(var i=0; i<n; i++) emoteStr += emoteArray[Math.floor(Math.random()*emoteArray.length)] + eModifiers[Math.floor(Math.random()*eModifiers.length)] + ' ';
    else
        for(var i=0; i<n; i++) emoteStr += emoteArray[Math.floor(Math.random()*emoteArray.length)] + ' ';
    return emoteStr;
};
randEmote.sendMsg = function(text) {
    var f = new FormData();
    f.append('content',text);
    $.ajax({
        type: "POST",
        url: "https://discordapp.com/api/channels/" + window.location.pathname.split('/').pop() + "/messages",
        headers: {
            "authorization": cat_token.slice(1, -1)
        },
        data: f,
        processData: false,
        contentType: false
    });
};

randEmote.prototype.load = function () {};
randEmote.prototype.unload = function () {};
randEmote.prototype.stop = function () {};
randEmote.prototype.onMessage = function () {};
randEmote.prototype.observer = function (e) {};
randEmote.prototype.getSettingsPanel = function () {
    return "";
};
randEmote.prototype.getName = function () {
    return "Random emotes";
};
randEmote.prototype.getDescription = function () {
    return "Send one ore more random emotes with /emote <amount>, /emotem for random modifiers";
};
randEmote.prototype.getVersion = function () {
    return ".6";
};
randEmote.prototype.getAuthor = function () {
    return "Ckat/Catblaster";
};
