window.onload = initialConfig();
var carouselSize = 3;
var buttonCount, carousel, recSize, recItems;

function initialConfig() {
	var url = "http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X"
	var scriptElement = document.createElement("script");

	scriptElement.setAttribute("src", url);
	scriptElement.setAttribute("id", "jsonp");

	var oldScriptElement = document.getElementById("jsonp");
	var head = document.getElementsByTagName("head")[0];

	if (oldScriptElement == null) {
		head.appendChild(scriptElement);
	} else {
		head.replaceChild(scriptElement, oldScriptElement);
	}
}

function X(info) {
	recSize = info.data.widget.size;
	
	var refContainer = document.getElementById("referenceContainer");
	refItem = info.data.reference.item;
	refContainer.innerHTML = '<div class="item reference">' + itemHTML(refItem) + "</div>";

	carousel = document.getElementById("recommendationCarousel");
	recItems = info.data.recommendation;
	buttonCount = 1;
	setEventListeners();

	var recommendations = '';
	for (var i = 0; i < recSize; i++) {
		recommendations = recommendations + '<div class="item">' + itemHTML(recItems[i]) + '</div>';
	}
	carousel.innerHTML = recommendations;
}

function itemHTML(refItem) {
	var html = `<img src="http:${refItem.imageName}"><a class="description" href="${refItem.detailUrl}">${refItem.name}</a>`
	if (refItem.oldPrice != null) {
		html = html + `<div class="oldprice">De: ${refItem.oldPrice}</div>`;
	}
	html = html + `<div class="payment">Por: <div class="price">${refItem.price}</div> <br> ${refItem.productInfo.paymentConditions}</div>`;
	return html;
}

function getNextRecommendations() {
	var start = (buttonCount-1)*carouselSize;
	var finish = buttonCount*carouselSize;
	if (recSize < finish) {
		finish = recSize;
	}

	for (var i = start+1; i <= finish; i++) {
		var item = document.getElementsByClassName("item")[i];
		item.style.width = 0;
		setTimeout(function(item){
			item.style.display = "none";
			console.log("Display = none");
		},1000,item);
	}
}

function setEventListeners() {
	document.getElementsByClassName("arrowbox--right")[0].addEventListener("click", moveNext);
	document.getElementsByClassName("arrowbox--left")[0].addEventListener("click", movePrev);
}

function movePrev() {
	if (buttonCount > 1) {
		buttonCount--;
	} else {
		buttonCount = (recSize%carouselSize)+1;
	}
	console.log(buttonCount);
	getRecommendations();
}

function moveNext() {
	if (buttonCount*carouselSize >= recSize) {
		buttonCount = 0;
	}
	console.log(buttonCount);
	getNextRecommendations();
	buttonCount++;
}
