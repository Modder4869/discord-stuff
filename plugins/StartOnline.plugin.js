//META{"name":"StartOnline"}*//
var StartOnline = function () {};
StartOnline.prototype.start = function () {
    var U_token = "";
    try{
        const U_iframe = document.createElement('iframe'); U_iframe.style.display = 'none'; 
        document.body.appendChild(U_iframe); 
        U_token = U_iframe.contentWindow.localStorage.token;
    }catch(e){ console.warn("StartOnline: failed to attach iframe and set token: " + e); }

    $.ajax({
        url: "https://canary.discordapp.com/api/v6/users/@me/settings",
        type: "PATCH", 
        headers: {
            authorization: U_token.slice(1,-1),
            "Content-Type": "application/json",
        },
        data: JSON.stringify({status: "online"})
    });
    
};
StartOnline.prototype.onSwitch = function () {};
StartOnline.prototype.load = function () {};
StartOnline.prototype.unload = function () {};
StartOnline.prototype.stop = function () {};
StartOnline.prototype.onMessage = function () {};
StartOnline.prototype.observer = function (e) {};
StartOnline.prototype.getSettingsPanel = function () {
    return "";
};
StartOnline.prototype.getName = function () {
    return "Start Online";
};
StartOnline.prototype.getDescription = function () {
    return "Set status to online on startup";
};
StartOnline.prototype.getVersion = function () {
    return ".1";
};
StartOnline.prototype.getAuthor = function () {
    return "ckat/cate";
};
