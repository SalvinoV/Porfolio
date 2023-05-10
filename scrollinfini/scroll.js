const imagesList = document.querySelector(".images-list");
const errorMsg = document.querySelector(".error-msg");
let searchQuery = "random";
let pageIndex = 1;

async function fetchData() {
	try {
		const response = await fetch(
			`https://api.unsplash.com/search/photos?page=${pageIndex}&per_page=30&query=${searchQuery}&client_id=jSj6j-zSamDnokJ7ciAy34u5o04_Mj1tQEXTX0Sm44E`
		);

		if (!response.ok) {
			throw new Error(`Erreur: ${response.status}`);
		}

		const data = await response.json();

		if (!data.total) {
			imagesList.textContent = "";
			throw new Error(
				"BRUH,y'a rien de tel dans la base de donnees ... tente un autre truc plus precis !"
			);
		}

		console.log(data);
		createImages(data.results);
	} catch (error) {
		errorMsg.textContent = `${error}`;
	}
}
fetchData();

function createImages(data) {
	data.forEach((img) => {
		const newImg = document.createElement("img");
		newImg.src = img.urls.regular;
		imagesList.appendChild(newImg);
	});
}
const observer = new IntersectionObserver(handleIntersect, {
	rootMargin: "50%",
});
observer.observe(document.querySelector(".infinite-marker"));
//fonction pour scroller a nouveau
function handleIntersect(entries) {
	if (window.scrollY > window.innerHeight && entries[0].isIntersecting) {
		pageIndex++;
		fetchData();
	}
}

//MAINTENANT LA BARRE DE RECHERCHE

const input = document.querySelector("#research");
const form = document.querySelector("form");

form.addEventListener("submit", handleSearch);

function handleSearch(e) {
	e.preventDefault();

	imagesList.textContent = "";
	if (!input.value) {
		errorMsg.textContent = "L'objet de la recherche de peut être vide.";
		return;
	}

	errorMsg.textContent = "";
	searchQuery = input.value;
	pageIndex = 1;
	fetchData();
}

const scrollToTop = document.querySelector(".btn-to-top");

scrollToTop.addEventListener("click", pushToTop);

function pushToTop() {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
}
