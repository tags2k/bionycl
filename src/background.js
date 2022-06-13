chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
	  "id": "bionyclContextMenuPage",
	  "title": "Bionycl this page",
	  "contexts": ["page"]
	});
	/*chrome.contextMenus.create({
		"id": "bionyclContextMenuElement",
		"title": "Bionycl this element",
		"contexts": ["page"]
	  });*/
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
	const tabId = tab.id;

	chrome.scripting.executeScript({
		target: {tabId: tabId, allFrames: true},
		files: ['common.js']});

	if (info.menuItemId == "bionyclContextMenuPage") {
		chrome.scripting.executeScript({
			target: {tabId: tabId, allFrames: true},
			files: ['forcestart.js']});
	}
	if (info.menuItemId == "bionyclContextMenuElement") {
		chrome.tabs.sendMessage(tabId, "getBioncylClickedElement", {frameId: info.frameId}, data => {
			elt.value = data.value;
		});
	}
});