//META{"name":"emoteSearch"}*//
var emoteSearch = function () {};
var emoteStore;
var resultStore = [];
emoteSearch.prototype.start = function () {
    this.attachParser();
    var start = (new Date).getTime();
    try{
        emoteStore = jQuery.extend({}, emotesTwitch["emotes"], subEmotesTwitch, emotesFfz, emotesBTTV, emotesBTTV2);
        console.log('emoteSearch: emotes loaded');
        var diff = (new Date).getTime() - start;
        console.log('emoteSearch: took ' + diff + 'ms');
    }catch(e){ console.warn('emoteSearch: failed to load emotes: ' + e); }
};
emoteSearch.prototype.attachParser = function(){
    var el = $('.textArea-20yzAH');
    if (el.length == 0) return;
    this.handleKeypress = function (e) {
        var code = e.keyCode || e.which;
        if(code !== 13) return;
        var text;
	    try{var val = $('.textArea-20yzAH').val();
            if(val.startsWith('/es')){
	            var arg = val.split(' ');
	            if(arg[1] != undefined){
                    resultStore = emoteSearch.search(arg[1]);
		            emoteSearch.showPrompt(0, 100); 
                }
                $(this).val("");
	            e.preventDefault();
	            e.stopPropagation();
	            return;
	        }
	    }catch(e){ console.warn("emoteSearch: unable to attach to textarea: " + e); }
    };
    el[0].addEventListener("keydown", this.handleKeypress, false);
};
emoteSearch.alert = function (title, text) {
    var cateAlert = '<div class="cate-alert" style="position:absolute; left:20%; top:40%; width:60%; height:30%; background-color:#0C090A; color:#b3b8c3"><center><b>'+title+'</b></center><button onclick="$(\'.cate-alert\').remove();" style="position:absolute;top:0px;right:0px;">X</button><hr/>'+text+'</div></div>';
    $("body").append(cateAlert);
};
emoteSearch.search = function(s) {
    var matches = [];
    for(var k in emoteStore) if(k.toLowerCase().indexOf(s.toLowerCase()) > -1) matches.push(k);
    return matches;
};
emoteSearch.showPrompt = function(loopStart, loopEnd) {
    var emotePics = "";
    if(loopEnd >= resultStore.length) loopEnd = resultStore.length;
    for(i=loopStart;i<loopEnd;i++){
        var emoteKey = resultStore[i];
        var emote = "";
        if (emotesTwitch["emotes"].hasOwnProperty(emoteKey)) {
            emote = '//static-cdn.jtvnw.net/emoticons/v1/' + emotesTwitch['emotes'][emoteKey].image_id + '/1.0' 
        } else if (subEmotesTwitch.hasOwnProperty(emoteKey)) {
            emote = '//static-cdn.jtvnw.net/emoticons/v1/' + subEmotesTwitch[emoteKey] + '/1.0' 
        } else if (emotesFfz.hasOwnProperty(emoteKey)) {
            emote = '//cdn.frankerfacez.com/emoticon/' + emotesFfz[emoteKey] + '/1'; 
        } else if (emotesBTTV.hasOwnProperty(emoteKey)) {
            emote = emotesBTTV[emoteKey];
        } else if (emotesBTTV2.hasOwnProperty(emoteKey)) {
            emote = '//cdn.betterttv.net/emote/' + emotesBTTV2[emoteKey] + '/1x'; 
        }
        emotePics += '<span class=emotewrapper><a href=#><img draggable=false onclick="$(\'.textArea-20yzAH\').val($(\'.textArea-20yzAH\').val()+\''+' '+emoteKey+'\'); document.getElementsByClassName(\'textArea-20yzAH\')[0].dispatchEvent(new Event(\'input\', { bubbles: true }))" class=emote src='+emote+' alt='+emoteKey+'></a></span>';
    }
    emotePics+='<br/>';
    if(loopStart != 0){// dont ask me why i make new vars for start/end js refuses to do +100/-100 correctly when doing it inline, what do I look like to you some kind of professional js person
        var prevStart = loopStart-100;
        var prevEnd = loopStart;
        emotePics += '<button onclick="$(\'.cate-alert\').remove(); emoteSearch.showPrompt('+ prevStart +','+ prevEnd +')"style="position:absolute;top:0px;left:10%;">←</button>';
    }
    if(loopEnd != resultStore.length){
        var nextStart = loopEnd;
        var nextEnd = loopEnd+100;
        emotePics += '<button onclick="$(\'.cate-alert\').remove(); emoteSearch.showPrompt('+ nextStart +','+ nextEnd +')" style="position:absolute;top:0px;right:10%;">→</button>';
    }
    console.log('loopstart: '+loopStart+' loopend: '+loopEnd);
    var totalPages = resultStore.length % 100 == 0 ? resultStore.length/100 : (resultStore.length/100 | 0) + 1;
    var currentPage = loopEnd == resultStore.length ? totalPages : loopEnd/100;  
    emoteSearch.alert(resultStore.length + " emotes found | page "+currentPage+"/"+totalPages,emotePics);
}
emoteSearch.prototype.onSwitch = function () {
    this.attachParser();
};
emoteSearch.prototype.load = function () {};
emoteSearch.prototype.unload = function () {};
emoteSearch.prototype.stop = function () {};
emoteSearch.prototype.onMessage = function () {};
emoteSearch.prototype.observer = function (e) {};
emoteSearch.prototype.getSettingsPanel = function () {
    return "";
};
emoteSearch.prototype.getName = function () {
    return "Emote search";
};
emoteSearch.prototype.getDescription = function () {
    return "Search through all emotes in bd with /es emoteuwant";
};
emoteSearch.prototype.getVersion = function () {
    return ".5";
};
emoteSearch.prototype.getAuthor = function () {
    return "Ckat/Catblaster edited by confus";
};

