//META{"name":"httpcatsBackground"}*//
var httpcatsBackground = function () {};
var cats = ["100","101","200","201","202","204","206","207","300","301","302","303","304","305","307","400","401","402","403","404","405","406","408","409","410","411","412","413","414","415","416","417","418","420","421","422","423","424","425","426","429","431","444","450","451","500","502","503","504","506","507","508","509","511","599"];

httpcatsBackground.prototype.start = function() {
    this.newCat = function (){
        $('.app').attr('style', "background-size:cover!important; background-image: url('https://http.cat/"+cats[Math.floor(Math.random() * cats.length)]+"')!important");
    }

    this.interval = setInterval(this.newCat, 10000);
    this.newCat();
}
httpcatsBackground.prototype.stop = function () { clearInterval(this.interval); };
httpcatsBackground.prototype.onSwitch = function () {};
httpcatsBackground.prototype.load = function () {};
httpcatsBackground.prototype.unload = function () {};
httpcatsBackground.prototype.onMessage = function () {};
httpcatsBackground.prototype.observer = function (e) {};
httpcatsBackground.prototype.getSettingsPanel = function () {
    return "";
};
httpcatsBackground.prototype.getName = function () {
    return "actual-httpcats-background";
};
httpcatsBackground.prototype.getDescription = function () {
    return "set random cat pics from http.cat as background every 10 seconds. ''''inspired'''' by martmists' plugin. only works with transparent themes.";
};
httpcatsBackground.prototype.getVersion = function () {
    return ".1";
};
httpcatsBackground.prototype.getAuthor = function () {
    return "ckat/cate";
};
