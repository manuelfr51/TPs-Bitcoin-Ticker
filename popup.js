function poll() {
	chrome.runtime.sendMessage({request: "request"}, function(response) {
  generateTable(response.data);
});
}
function generateTable(lastResponse) {
	console.log('Generating table');
	var resp=JSON.parse(lastResponse);
	
	var headers=new Array("", "last", "high", "volume", "vwap" ,"low", "ask", "bid");
	var currencies=new Array("", "MXN");
	var table=document.getElementById("CurrencyTable");
	table.innerHTML="";
	
	var tableBody=document.createElement("tbody");
	
	var row=document.createElement("tr");
	for (var i=0;i<6;i++)
	{
		var cell=document.createElement("td");
		var cellText=document.createTextNode(headers[i]);
		cell.appendChild(cellText);
		row.appendChild(cell);
	}
	tableBody.appendChild(row);
	
	
	for(var j=0;j<18;j++){
		var key=currencies[j]
		row=document.createElement("tr");
	
		for (var i=0; i < 6; i++) {
			var cell=document.createElement("td");
			if (i==0) {
				var cellText=document.createTextNode(key);
			} else {
				var cellText=document.createTextNode(resp[key][headers[i]]);
			}
			cell.appendChild(cellText);
			row.appendChild(cell);
		}
	
		tableBody.appendChild(row);
	}
	
	table.appendChild(tableBody);
	table.setAttribute("border", "2");
}

setInterval(poll, 10000);
poll();
