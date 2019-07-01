window.onload = initialConfig();

/* Variáveis globais
 * carouselSize indica a quantidade de produtos "inteiros" aparecem por vez
 * buttonCount indica a página atual no carousel
 * recSize indica a quantidade de recomendações totais
 **/
var carouselSize = 3;
var buttonCount, recSize;

/* initialConfig roda assim que a página carregar
 * faz o acesso dinâmico ao jsonp
 * subsitui qualquer outro jsonp que possa ter na página
 **/
function initialConfig() {
	/* Conseguir conexão https com servidor para acabar com problemas de conexão */
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

/* X recebe como argumento as informações dos produtos
 * trata essas informações para que apareçam na página
 **/
function X(info) {
	recSize = info.data.widget.size;
	
	/* Insere o produto referência em seu lugar no html */
	var refContainer = document.getElementById("referenceContainer");
	var refItem = info.data.reference.item;
	refContainer.innerHTML = '<div class="item reference">' + itemHTML(refItem) + "</div>";

	var recItems = info.data.recommendation;
	buttonCount = 1;
	setEventListeners();

	/* Insere as recomendações em sequência no html */
	var recommendations = '';
	for (var i = 0; i < recSize; i++) {
		recommendations = recommendations + '<div class="item">' + itemHTML(recItems[i]) + '</div>';
	}
	document.getElementById("recommendationCarousel").innerHTML = recommendations;
}

/* itemHTML pega as informações do item e adiciona o html e css em volta
 * Necessário para que os items fiquem certo na página
 **/
function itemHTML(refItem) {
	var html = `<img src="http:${refItem.imageName}"><a class="description" href="${refItem.detailUrl}">${refItem.name}</a>`

	/* Insere o preço antigo apenas se esse existir */
	if (refItem.oldPrice != null) {
		html = html + `<div class="oldprice">De: ${refItem.oldPrice}</div>`;
	}

	html = html + `<div class="payment">Por: <div class="price">${refItem.price}</div> <br> ${refItem.productInfo.paymentConditions}</div>`;
	return html;
}

/* getRecommendations muda a página do carousel
 * serve para os botões de ida e volta
 * aplicado translateX para fazer a movimentação dos items
 * o cálculo leva em consideração a quantidade de itens a ser mexida e a página em questão
 **/
function getRecommendations() {
	var move = buttonCount*carouselSize*100;
	console.log(move);

	for (var i = 1; i <= recSize; i++) {
		var item = document.getElementsByClassName("item")[i];
		item.style.transform = `translateX(-${move}%)`;
	}
}

/* setEventListeners adiciona listeners nos botões de ida e volta do carousel
 * necessário para mudar de página
 **/
function setEventListeners() {
	document.getElementsByClassName("arrowbox--right")[0].addEventListener("click", moveNext);
	document.getElementsByClassName("arrowbox--left")[0].addEventListener("click", movePrev);
}

/* movePrev é a ação do botão de voltar na paginação do carousel
 * verifica se já não está na primeira página para fazer a ação
 * arruma buttonCount para que indique a página certa
 **/
function movePrev() {
	if (buttonCount > 1) {
		buttonCount -= 2;
		getRecommendations();
		buttonCount++;
		console.log(buttonCount);
	}
}

/* moveNext é a ação do botão de prosseguir na paginação do carousel
 * verifica se já não está na última página para fazer a ação
 * arruma buttonCount para que indique a página certa
 **/
function moveNext() {
	if (buttonCount*carouselSize < recSize) {
		getRecommendations();
		buttonCount++;
		console.log(buttonCount);
	}
}
