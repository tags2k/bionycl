chrome.storage.sync.get(window.bionyclDefaultConfig(), function(config) {
	if (config.interval > 0) window.setInterval(() => window.dobionycl(true), config.interval);
	window.dobionycl(true);
});