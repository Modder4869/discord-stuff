//META{"name":"fixsize"}*//
var fixsize = function () {};
fixsize.updateSize = function () {
    bdPluginStorage.set('fixsize', 'size', require('electron').remote.getCurrentWindow().getSize());
};
fixsize.resetSize = function () {
    bdPluginStorage.set('fixsize', 'size', [0, 0]);
};
fixsize.prototype.start = function () {
    var size = bdPluginStorage.get('fixsize', 'size');
    require('electron').remote.getCurrentWindow().setMinimumSize(1, 1);
    
    if (size == null) {
        console.log('fixsize: no config detected, creating empty config');
        fixsize.resetSize();
    } else if (size[0] != 0 && size[1] != 0) {
        require('electron').remote.getCurrentWindow().setSize(size[0], size[1]);
    }
};
fixsize.prototype.onSwitch = function () {};
fixsize.prototype.load = function () {};
fixsize.prototype.unload = function () {};
fixsize.prototype.stop = function () {};
fixsize.prototype.onMessage = function () {};
fixsize.prototype.observer = function (e) {};
fixsize.prototype.getSettingsPanel = function () {
	return '<button onclick="fixsize.updateSize()">save this size</button>' +
        '<br/><button onclick="fixsize.resetSize()">reset</button>';
};
fixsize.prototype.getName = function () {
    return "fix size";
};
fixsize.prototype.getDescription = function () {
    return "for some reason discord has a minimal window size, thats still too big. fix it with this";
};
fixsize.prototype.getVersion = function () {
    return ".2";
};
fixsize.prototype.getAuthor = function () {
    return "ckat/cate";
};

