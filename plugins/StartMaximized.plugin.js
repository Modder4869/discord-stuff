//META{"name":"StartMaximized"}*//
var StartMaximized = function () {};
StartMaximized.prototype.start = function () {
    $('.win-maximize').click();
};
StartMaximized.prototype.onSwitch = function () {};
StartMaximized.prototype.load = function () {};
StartMaximized.prototype.unload = function () {};
StartMaximized.prototype.stop = function () {};
StartMaximized.prototype.onMessage = function () {};
StartMaximized.prototype.observer = function (e) {};
StartMaximized.prototype.getSettingsPanel = function () {
    return "";
};
StartMaximized.prototype.getName = function () {
    return "Maximize on Startup";
};
StartMaximized.prototype.getDescription = function () {
    return "Maximize client on startup";
};
StartMaximized.prototype.getVersion = function () {
    return ".1";
};
StartMaximized.prototype.getAuthor = function () {
    return "ckat/cate";
};

