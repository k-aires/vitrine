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
}

function itemHTML(name,imageName,detailUrl,price,oldPrice,productInfo) {
	var html = `<div class="item"><img src="http:${imageName}"><a class="description" href="${detailUrl}">${name}</a><div class="oldprice">De: ${oldPrice}</div><div class="payment">Por: <div class="price">${price}</div> <br> ${productInfo}</div></div>`;
	return html;
}
