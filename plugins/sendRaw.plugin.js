//META{"name":"sendRaw"}*//
var cat_token;
var sendRaw = function () {};
sendRaw.prototype.start = function () {
    try{
        const cat_iframe = document.createElement('iframe'); cat_iframe.style.display = 'none'; 
        document.body.appendChild(cat_iframe); 
        cat_token = cat_iframe.contentWindow.localStorage.token;
    }catch(e){ console.warn("sendRaw: failed to attach iframe and set token: " + e); }

    this.attachParser();
    this.observer = function(e) {
        if (!e.addedNodes.length || !(e.addedNodes[0] instanceof Element)) return;

        let elem = e.addedNodes[0];

        if (elem.querySelector(".textArea-20yzAH")) {
            this.attachParser();
        }
    }
};
sendRaw.prototype.attachParser = function(){
    let el = $('.textArea-20yzAH');
    if (el.length == 0) return;
    this.handleKeypress = function (e) {
        let code = e.keyCode || e.which;
        if(code !== 13) return;
        let text;
        try{let val = $('.textArea-20yzAH').val();
            if(val.startsWith('/r ') || val.indexOf(' /r') > -1){
                sendRaw.sendMsg(val.replace(/\/r | \/r/g, ''));
                sendRaw.setText('');
                e.preventDefault();
                e.stopPropagation();
                return;
            }
        }catch(e){ console.warn("sendRaw: unable to attach to textarea: " + e); }
    };
    el[0].addEventListener("keydown", this.handleKeypress, false);
};
sendRaw.sendMsg = function(text) {
    let f = new FormData();
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
sendRaw.setText = function(new_val) {
    try {
        let textarea = $('.textArea-20yzAH')[0];
        textarea.focus();
        textarea.selectionStart = 0;
        textarea.selectionEnd = textarea.value.length;
        document.execCommand("insertText", false, new_val);
    } catch(e) { console.log('failed to set text: ' + e); }
};

sendRaw.prototype.onSwitch = function () {
    this.attachParser();
}
sendRaw.prototype.load = function () {};
sendRaw.prototype.unload = function () {};
sendRaw.prototype.stop = function () {};
sendRaw.prototype.onMessage = function () {};
sendRaw.prototype.observer = function (e) {};
sendRaw.prototype.getSettingsPanel = function () {
    return "";
};
sendRaw.prototype.getName = function () {
    return "Send Raw";
};
sendRaw.prototype.getDescription = function () {
    return "Send message raw through api with /r";
};
sendRaw.prototype.getVersion = function () {
    return ".1";
};
sendRaw.prototype.getAuthor = function () {
    return "Ckath/k8";
};
