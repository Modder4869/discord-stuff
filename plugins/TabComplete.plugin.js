//META{"name":"TabCompletion"}*//

/*
 ====== Installation ======
 1. Save file as TabCompletion.js
 2. place file in %appdata%/BetterDiscord/plugins
 3. Refresh Discord (ctrl+R)
 4. Go to Settings > BetterDiscord > Plugins
 5. Enable TabCompletion

 The plugin only tabcompletes favorited emotes,
 so you will have to click the star in the top right
 corner of the emotes to add them to favorite list.

 ======== Changelog ========
 1.0: Initial verison
 1.1: Fixed bug when switching servers
 1.2: Clean up of handlers and scripts on stop
 1.3: Prevent event handler attaching twice
 1.4: Fix clash when tab completing users
 1.5: Fix injecting Caret plugin multiple times
 1.6: Fix to work with new emote menu
 1.6-1: Fix for new textArea updating
 1.6-2: Fix for new textArea updating, again

**/

function TabCompletion() {}

TabCompletion.prototype.load = function() {};

TabCompletion.prototype.unload = function() {};

TabCompletion.prototype.start = function() {
	this.attachHandler();
     this.observer = function(e) {
         if (!e.addedNodes.length || !(e.addedNodes[0] instanceof Element)) return;

         var elem = e.addedNodes[0];

         if (elem.querySelector(".textArea-2Spzkt")) {
             this.attachHandler();
         }
     }
};

TabCompletion.prototype.onSwitch = function() {
	this.attachHandler();
};

TabCompletion.prototype.stop = function() {
	var el = $('.textArea-2Spzkt');
	if (el.length == 0) return;

	// Remove handlers and injected script
	el.unbind("click focus", this.focusHandler);
	el[0].removeEventListener("keydown", this.handleKeypress);
	$('#jqueryCaretPlugin').remove();
};

TabCompletion.prototype.getName = function() {
	return "Tab Completion";
};

TabCompletion.prototype.getDescription = function() {
	return "Adds tabcompletion for favorited emotes";
};

TabCompletion.prototype.getVersion = function() {
	return "1.6-3";
};

TabCompletion.prototype.getAuthor = function() {
	return "EhsanKia kept alive by Cate";
};

TabCompletion.prototype.attachHandler = function() {
	var el = $('.textArea-2Spzkt');
	if (el.hasClass("TabComplete")) return;
	if (el.length == 0) return;

    // fixed text update function
    set_text = function(v) {
        try {
        el[0].selectionStart = 0;
        el[0].selectionEnd = el[0].value.length;
        document.execCommand("insertText", false, v);
        } catch(e) { console.log('failed to set text: ' + e); }
    };

	// Inject jQuery Caret plugin
	if($("#jqueryCaretPlugin").length === 0) {
		var s = document.createElement("script");
		s.id = "jqueryCaretPlugin"
		s.type = "text/javascript";
		s.src = "//raw.githubusercontent.com/acdvorak/jquery.caret/master/src/jquery.caret.js";
		$("head").append(s);
	}

	// Couple variables to track state
	var self = this;
	this.tabtries = -1;
	this.textsplit = ["", "", ""];
    var cur_text = "";

	// Handler to reset tab status
	this.focusHandler = function() {
		self.tabtries = -1;
	}

	// Handler to catch key events
	this.handleKeypress = function (e) {
		if (document.querySelector(".autocomplete-1vrmpx, .autocomplete-i9yVHs")) return;
		var code = e.keyCode || e.which;
		if (code == 9) { // tab pressed
			e.preventDefault();

			// if this is the first time tab is pressed here, we split the text before and after the word
			if (self.tabtries == -1) {
				$this = $(this);
				var caretpos = $this.caret(); textfunction = function(v) { return (arguments.length?set_text(v):$this.val()); };

				var text = textfunction();
				var start = (/[@\w]+$/.exec(text.substr(0, caretpos)) || {index: caretpos}).index;
				var end = caretpos + (/^\w+/.exec(text.substr(caretpos)) || [""])[0].length;
				self.textsplit = [text.substring(0, start), text.substring(start, end), text.substring(end + 1)];
			}

			// If no words in front of caret, exit
			if (self.textsplit[1] === "") return;

			// calculate the collection of strings actually eligible for suggestion, either by filtering or by executing the function specified
			var collection = Object.keys(quickEmoteMenu.favoriteEmotes);
			collection = collection.filter(function(v){
				return v.toLowerCase().indexOf(self.textsplit[1].toLowerCase())==0;
			});

			// collection now (hopefully) is a list of values
			if (collection.length > 0) {
				// shift key iterates backwards
				self.tabtries += e.shiftKey?-1:1;
				if(self.tabtries >= collection.length) self.tabtries = 0;
				if(self.tabtries < 0) self.tabtries = collection.length+self.tabtries;
				textfunction(self.textsplit[0] + collection[self.tabtries] + self.textsplit[2]);
				$(self).caret(self.textsplit[0].length + collection[self.tabtries].length);
			}
		} else if(code == 27 && self.tabtries>=0) { // escape
			textfunction(self.textsplit[0] + self.textsplit[1] + self.textsplit[2]);
		} else if(code != 16) {  // not shift
			self.tabtries = -1;
		}

	};

	// bind handlers
	el.bind("click focus", this.focusHandler);
	el[0].addEventListener("keydown", this.handleKeypress, false);
	el.addClass("TabComplete");
}
