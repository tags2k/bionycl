window.bionycl = function(config, p, applyOuter, hostMatch) {};

window.bionycl = function(config, p, applyOuter, hostMatch) {
    var period = ".";
    var comma = ",";
    var colon = ":";
    var semiColon = ";";
    var apostrophe = "'";
    var commonWords = Array.from(config.commonwords.split(","));

    if (applyOuter) {
        var additionalStyles = {};

        for (var x = 1; x <= 10; x++) {
            if (config[`parastyle${x}prop`]) {
                if (hostMatch) {
                    for (var y = 1; y <= 10; y++) {
                        if (config[`host${hostMatch}para${y}prop`]) { // override found
                            if (config[`parastyle${x}prop`] == config[`host${hostMatch}para${y}prop`]) {
                                config[`parastyle${x}value`] = config[`host${hostMatch}para${y}value`];
                            } else {
                                additionalStyles[config[`host${hostMatch}para${x}prop`]] = config[`host${hostMatch}para${y}value`];
                            }
                        }
                    }
                }

                p.style.setProperty(config[`parastyle${x}prop`], config[`parastyle${x}value`], "important");
            }
        }

        Array.from(Object.keys(additionalStyles)).forEach(k => p.style.setProperty(k, additionalStyles[k], "important"));

        p.style.setProperty("display", "block");
    }

    Array.from(p.childNodes).forEach(node => {
        if (node.getAttribute && node.getAttribute("role") === "button") return;

        if (node.nodeType === 3 || node.tagName == "TEXT") {
            var parentNode = node.parentNode;
            var firstWord = true;
            var processWord = (word, opts) => {
                var bold = 1;

                if (word == "-") {
                    bold = 0;
                } else {
                    var letters = word.length;
                    var lettersStart = 0;

                    if (word.endsWith(period)) letters--;
                    else if (word.endsWith(comma)) letters--;
                    else if (word.endsWith(colon)) letters--;
                    else if (word.endsWith(semiColon)) letters--;

                    if (word.indexOf(apostrophe) > -1) letters--;
                    if (word.startsWith('“') || word.startsWith('"')) lettersStart = 1;

                    if (letters >= 10) bold = config.letters10;
                    if (letters == 9) bold = config.letters9;
                    if (letters == 8) bold = config.letters8;
                    if (letters == 7) bold = config.letters7;
                    else if (letters == 6) bold = config.letters6;
                    else if (letters == 5) bold = config.letters5;
                    else if (letters == 4) bold = config.letters4;
                    else if (letters == 3) bold = config.letters3;
                    else if (letters == 2) bold = config.letters2;
                    else if (letters == 1) bold = config.letters1;
                }

                if (firstWord && bold == 0) {
                    bold = 1;
                }

                if (word == "he" && bold == 0) {
                    bold = 1;
                }

                if (lettersStart > 0) {
                    parentNode.insertBefore(document.createTextNode(word.substr(0, lettersStart)), node);
                }

                var spaceAfter = opts && opts.nospace ? "" : " ";

                if (bold == 0) {
                    parentNode.insertBefore(document.createTextNode(word + spaceAfter), node);
                } else {
                    var b = document.createElement("b");
                    b.setAttribute("style", config.style);
                    if (b.style["font-weight"]) {
                        var fontWeight = parseFloat(b.style["font-weight"]);
                        b.style["font-weight"] = (fontWeight * config.existingweightmultiplier).toString();
                    } else {
                        b.style["font-weight"] = config.defaultweight;
                    }

                    b.innerText = word.substr(lettersStart, bold);
                    b.classList.add("__bionycl");

                    parentNode.insertBefore(b, node);
                    parentNode.insertBefore(document.createTextNode(word.substr(bold + lettersStart) + spaceAfter), node);

                    if (firstWord) firstWord = false;
                }
            };

            node.textContent.split(" ").forEach(word => {
                if (config.ignorecommon && commonWords.includes(word)) {
                    parentNode.insertBefore(document.createTextNode(word + " "), node);
                    return;
                }

                if (word.indexOf("-") > 0) {
                    var hyphenated = word.split("-");
                    processWord(hyphenated[0], { nospace: true });
                    parentNode.insertBefore(document.createTextNode("-"), node);
                    processWord(hyphenated[1]);
                } else {
                    processWord(word);
                }
            });

            node.remove();
        } else {
            var hasBionycls = node && node.querySelector && node.querySelector(".__bionycl");
            if (!hasBionycls) {
                window.bionycl(config, node, false, hostMatch);
            }
        }
    });
};

window.bionyclDefaultConfig = function() {
    var c = {
        auto: true,
        interval: 5000,
        commonwords: 'a,an,as,and,at,be,by,do,for,go,if,in,it,its,is,like,of,on,or,so,to,up',
        ignorecommon: false,
        letters1: 1,
        letters2: 1,
        letters3: 1,
        letters4: 2,
        letters5: 3,
        letters6: 3,
        letters7: 4,
        letters8: 4,
        letters9: 5,
        letters10: 5,
        existingweightmultiplier: 1.75,
        defaultweight: 750,
        style: '',
        parastyle1prop: 'background',
        parastyle1value: '#fcfdfc',
        parastyle2prop: 'padding',
        parastyle2value: '2em',
        parastyle3prop: 'font',
        parastyle3value: 'Lato, Helvetica, sans-serif',
        parastyle4prop: 'font-weight',
        parastyle4value: '350',
        parastyle5prop: 'letter-spacing',
        parastyle5value: '0.02em',
        parastyle6prop: 'line-height',
        parastyle6value: '2.2em',
        parastyle7prop: 'color',
        parastyle7value: '#636463',
        parastyle8prop: 'font-size',
        parastyle8value: '0.95em',
        parastyle9prop: 'max-width',
        parastyle9value: '65em',
        parastyle10prop: '',
        parastyle10value: ''
    };

    for (var x = 1; x <= 10; x++) {
        c[`host${x}`] = '';
        c[`host${x}selector`] = '';
        c[`host${x}forceauto`] = false;
        c[`host${x}applyouter`] = false;
        c[`host${x}ignoreondemand`] = false;

        for (var y = 1; y <= 10; y++) {
            c[`host${x}para${y}prop`] = '';
            c[`host${x}para${y}value`] = '';
        }
    }

    c['host1'] = 'https://twitter.com';
    c['host1selector'] = 'div[data-testid="tweetText"]';
    c['host1applyouter'] = true;

    c['host2'] = 'https://www.facebook.com';
    c['host2selector'] = 'div[role="article"]';

    c['host3'] = 'https://sites-to-ignore-auto';
    c['host3selector'] = '._nothingplease';
    c['host3ignoreondemand'] = true;

    return c;
};

window.dobionycl = (isAuto) => {
	var main = document.getElementsByTagName("main")[0];
	var article = document.getElementsByTagName("article")[0];
	chrome.storage.sync.get(window.bionyclDefaultConfig(), function(config) {
		var hostMatch = undefined;
		for (var x = 1; x <= 10; x++) {
			if (config[`host${x}`] && config[`host${x}`].length) {
				if (window.bionyclClickedElement && config[`host${x}ignoreondemand`]) continue;

				if (config[`host${x}`].indexOf(",")) {
					Array.from(config[`host${x}`].split(",")).forEach(i => {
						if (window.location.href.indexOf(i) > -1) {
							hostMatch = x;
						}
					});
				} else if (window.location.origin.indexOf(config[`host${x}`]) > -1) {
					hostMatch = x;
				}
			}
		}

		if (isAuto && !config.auto)
		{
			if (hostMatch === undefined) return;
			if (!config[`host${hostMatch}forceauto`]) return;
		}

		var targets = null;
		
		if (hostMatch === undefined || !config[`host${hostMatch}selector`]) {
			targets = Array.from((article ? article : main ? main : document).getElementsByTagName("p"));
			window.bionyclSourceMainOrArticle = main || article;
		} else {
			targets = Array.from(document.querySelectorAll(config[`host${hostMatch}selector`]));
		}

		targets.forEach(p => {
			if (!p) return;
			if (p.classList.contains("___bionycl")) return;
			if (hostMatch === undefined) {
				if (p.contentEditable == "true") return;
			}

			p.classList.add("___bionycl");

			var applyOuter = true;
			if (hostMatch !== undefined) applyOuter = config[`host${hostMatch}applyouter`];
			window.bionycl(config, p, applyOuter, hostMatch);
		});

		window.bionyclClickedElement = undefined;
	});
};

document.addEventListener("contextmenu", function(event){
    window.bionyclClickedElement = event.target;
}, true);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request == "getBioncylClickedElement") {
        window.bionyclSourceMainOrArticle = false;
        var element = window.bionyclClickedElement;
        if (element) {
            element = element.closest("p") ? element.closest("p") : element.closest("div") ? element.closest("div") : element;
            window.bionycl(window.bionyclDefaultConfig(), element, true);
        }
    }
});