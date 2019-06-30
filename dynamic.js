window.onload = initialConfig();

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
	console.log(info.data.widget.size);
	
	var refContainer = document.getElementById("referenceContainer");
	var refItem = info.data.reference.item;
	refContainer.innerHTML = '<div class="item reference">' + itemHTML(refItem) + "</div>";

	console.log("Reference loaded");

	var carousel = document.getElementById("recommendationCarousel");
	var recItems = info.data.recommendation;
	var recommendations = "";
	for (var i = 0; i < info.data.widget.size; i++) {
		recommendations = recommendations + '<div class="item">' + itemHTML(recItems[i]) + "</div>";
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
