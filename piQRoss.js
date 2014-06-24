var piQRoss = function () {
	var containerDiv = document.createElement("div");

	var text = document.getElementById("codethis").value;
	var qr = new QRCode(containerDiv, text);
	var cursorA = 0, cursorB = 0;
	var size = qr._oQRCode.moduleCount;
	var data = qr._oQRCode.modules;

	var hintsH = document.createElement("span");
	hintsH.id = "hintsH";

	var hintsV = document.createElement("span");
	hintsV.id = "hintsV";

	var groupSize = 0;

	for(cursorA=0; cursorA<size; cursorA++){	
		/* HORIZONTAL */
		var hintRow = document.createElement("span");
		hintRow.className = "hintRow";
		for(cursorB = 0; cursorB<size; cursorB++){
			if(data[cursorA][cursorB]){
				groupSize++;
			} else {
				if(groupSize>0){
					var hint = document.createElement("span");
					hint.className = "hint";
					hint.innerHTML = groupSize;
					hintRow.appendChild(hint);
				}
				groupSize=0;
			}
		}
		if(groupSize>0){
			var hint = document.createElement("span");
			hint.className = "hint";
			hint.innerHTML = groupSize;
			hintRow.appendChild(hint);
		}
		groupSize=0;
		hintsH.appendChild(hintRow);

		/* VERTICAL */
		var hintCol = document.createElement("span");
		hintCol.className = "hintCol";
		for(cursorB = 0; cursorB<size; cursorB++){
			if(data[cursorB][cursorA]){
				groupSize++;
			} else {
				if(groupSize>0){
					var hint = document.createElement("span");
					hint.className = "hint";
					hint.innerHTML = groupSize;
					hintCol.appendChild(hint);
				}
				groupSize=0;
			}
		}
		if(groupSize>0){
			var hint = document.createElement("span");
			hint.className = "hint";
			hint.innerHTML = groupSize;
			hintCol.appendChild(hint);
		}
		groupSize=0;
		hintsV.appendChild(hintCol);
	}

	var piQRoss = document.getElementById("piQRoss");
	piQRoss.innerHTML = "";

	var a, b, tableElem, rowElem, colElem;
	tableElem = document.createElement('table');
	tableElem.id = "qrtable";
	
	a = size; b = size;
	for (var i = 0; i < a; i++) {
		rowElem = document.createElement('tr');
		for (var j = 0; j < b; j++) {
			colElem = document.createElement('td');
			rowElem.appendChild(colElem);
		}
		tableElem.appendChild(rowElem);
	}

	var topFlex = document.createElement("span");
	topFlex.id = "topFlex";
	topFlex.appendChild(hintsV);	

	var bottomFlex = document.createElement("span");
	bottomFlex.id = "bottomFlex";
	bottomFlex.appendChild(hintsH);
	bottomFlex.appendChild(tableElem);

	piQRoss.appendChild(topFlex)
	piQRoss.appendChild(bottomFlex)
	document.body.appendChild(piQRoss);
	
	hintsV.style.width = tableElem.offsetWidth;
	hintsH.style.height = tableElem.offsetHeight;

	var cells  = document.getElementsByTagName("td");

	for (var i = 0; i < cells.length ; i++) {
	    cells[i].addEventListener("mousedown", 
	        function (event) {
	            event.preventDefault();
	            if(this.style.backgroundColor=="black"){
	            	this.style.backgroundColor = "transparent"
	            } else {
	            	this.style.backgroundColor = "black"
	            }
	        }, false);
	}
};