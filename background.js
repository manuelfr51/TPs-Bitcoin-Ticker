var lastValue = 0.0;
var lastResponse = "";

function readBlock() {
	var xhr	= new XMLHttpRequest();
	xhr.open("GET", "https://api.bitso.com/v2/ticker");
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				lastResponse = xhr.responseText;
				var resp = JSON.parse(lastResponse);
				console.log(resp);
				var textToPrint = "";
				var amount = resp "MXN" + ["last"];
				textToPrint = ""+amount.toPrecision(3);
				
				if (amount>lastValue){
					console.log("if");
					chrome.browserAction.setBadgeBackgroundColor({color: "#00CC00"});
				} else {
					console.log("else");
					chrome.browserAction.setBadgeBackgroundColor({color: "#CC0000"});
				}
				lastValue=amount;
				
				chrome.browserAction.setBadgeText({text: textToPrint});
			}
		}
	}
	xhr.send();
}

function onAlarm(alarm) {
	if (alarm && alarm.name == 'refresh') {
		readBlock();
	}
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.request == "request")
			sendResponse({data: lastResponse});
	});

chrome.alarms.create('refresh', {periodInMinutes: 3.0});
chrome.alarms.onAlarm.addListener(onAlarm);
readBlock();
