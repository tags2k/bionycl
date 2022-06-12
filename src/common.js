window.bionycl = function(config, p, applyOuter) {};

window.bionycl = function(config, p, applyOuter) {
    var period = ".";
    var comma = ",";
    var colon = ":";
    var semiColon = ";";
    var apostrophe = "'";
    var commonWords = Array.from(config.commonwords.split(","));

    if (applyOuter) {
        if (config.parastyle1prop) p.style.setProperty(config.parastyle1prop, config.parastyle1value, "important");
        if (config.parastyle2prop) p.style.setProperty(config.parastyle2prop, config.parastyle2value, "important");
        if (config.parastyle3prop) p.style.setProperty(config.parastyle3prop, config.parastyle3value, "important");
        if (config.parastyle4prop) p.style.setProperty(config.parastyle4prop, config.parastyle4value, "important");
        if (config.parastyle5prop) p.style.setProperty(config.parastyle5prop, config.parastyle5value, "important");
        if (config.parastyle6prop) p.style.setProperty(config.parastyle6prop, config.parastyle6value, "important");
        if (config.parastyle7prop) p.style.setProperty(config.parastyle7prop, config.parastyle7value, "important");
        if (config.parastyle8prop) p.style.setProperty(config.parastyle8prop, config.parastyle8value, "important");
        if (config.parastyle9prop) p.style.setProperty(config.parastyle9prop, config.parastyle9value, "important");
        if (config.parastyle10prop) p.style.setProperty(config.parastyle10prop, config.parastyle10value, "important");

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
                window.bionycl(config, node, false);
            }
        }
    });
};

window.bionyclDefaultConfig = function() {
    var c = {
        auto: true,
        interval: 5000,
        commonwords: 'a,an,as,and,at,be,by,do,for,go,if,in,it,its,is,like,of,on,or,so,to,up',
        ignorecommon: true,
        letters1: 0,
        letters2: 0,
        letters3: 1,
        letters4: 1,
        letters5: 2,
        letters6: 2,
        letters7: 3,
        letters8: 3,
        letters9: 4,
        letters10: 4,
        existingweightmultiplier: 1.75,
        defaultweight: 750,
        style: '',
        parastyle1prop: 'background',
        parastyle1value: '#f8f8f8',
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
        parastyle7value: 'black',
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