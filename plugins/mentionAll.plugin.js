//META{"name":"mentionAll"}*//
var mentionAll = function () {};
var emoteArray = [];
mentionAll.prototype.start = function () {
    this.attachParser();
};
mentionAll.prototype.onSwitch = function () {
    this.attachParser();
}
mentionAll.prototype.attachParser = function(){
    var el = $('.channel-textarea textarea');
    if (el.length == 0) return;
    this.handleKeypress = function (e) {
        var code = e.keyCode || e.which;
        if(code !== 13) return;
        var text;
	try{var val = $('.channel-textarea textarea').val();
        if(val == '@all'){
            var mentions = "";
            var msgs = [];

            // get uid list here
            var uids = BetterAPI.getClientUIDList();
            
            // generate mentions/split new arrayitem on 2000 length
            for(var i=0; i<uids.length; i++){
                if(mentions.length > 2000) {
                    msgs.push(mentions);
                    mentions = "";
                }
                mentions += '<@' + uids[i] + '> ';
            }

            // send messages
            msgs.push(mentions);
            for(var i=0;i<msgs.length;i++) mentionAll.sendMsg(msgs[i]);

	        $(this).val("");
	        e.preventDefault();
	        e.stopPropagation();
	        return;
	    }
	}catch(e){ console.warn("mentionAll: unable to attach to textarea: " + e); }
    };
    el[0].addEventListener("keydown", this.handleKeypress, false);
};
mentionAll.sendMsg = function(text) {
    var f = new FormData();
    f.append('content',text);
    $.ajax({
        type: "POST",
        url: "https://discordapp.com/api/channels/" + window.location.pathname.split('/').pop() + "/messages",
        headers: {
            "authorization": localStorage.token.slice(1, -1)
        },
        data: f,
        processData: false,
        contentType: false
    });
};

mentionAll.prototype.load = function () {};
mentionAll.prototype.unload = function () {};
mentionAll.prototype.stop = function () {};
mentionAll.prototype.onMessage = function () {};
mentionAll.prototype.observer = function (e) {};
mentionAll.prototype.getSettingsPanel = function () {
    return "";
};
mentionAll.prototype.getName = function () {
    return "Mention all";
};
mentionAll.prototype.getDescription = function () {
    return "mention all active users or something with @all";
};
mentionAll.prototype.getVersion = function () {
    return ".1";
};
mentionAll.prototype.getAuthor = function () {
    return "Ckat/Catblaster";
};
