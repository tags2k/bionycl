chrome.storage.sync.get(window.bionyclDefaultConfig(), function(config) {
	window.dobionycl = (isAuto) => {
		var main = document.getElementsByTagName("main")[0];
		var article = document.getElementsByTagName("article")[0];

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
			window.bionycl(config, p, applyOuter);
		});

		window.bionyclClickedElement = undefined;
	};

	if (config.interval > 0) window.setInterval(() => window.dobionycl(true), config.interval);
	window.dobionycl(true);
});