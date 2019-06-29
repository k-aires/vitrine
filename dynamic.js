document.body.onload = initialConfig();

function initialConfig() {
	var url = "http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X"
	var scriptElement = document.createElement("script");

	scriptElement.setAttribute("src", url);
	scriptElement.setAttribute("id", "jsonp");

	var oldScriptElement = document.getElementById("jsonp");
	var head = document.getElementById("head")[0];

	if (oldScriptElement == null) {
		head.appendChild(scriptElement);
	} else {
		head.replaceChild(scriptElement, oldScriptElement);
	}
}

function X() {
}

function itemHTML(name,imageName,detailUrl,price,oldPrice,productInfo) {
	var html = `<div class="item"><img src="${imageName}"><a class="description" href="${detailUrl}">${name}</a><div class="oldprice">De: ${oldPrice}</div><div class="payment">Por: <div class="price">${price}</div> <br> ${productInfo}</div></div>`;
	return html;
}
