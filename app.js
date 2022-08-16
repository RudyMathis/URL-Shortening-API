const menuBtn = document.querySelector(".hamburger-wrapper");

menuBtn.addEventListener("click", () => {
	const nav = document.querySelector("nav");
	nav.classList.toggle("hidden");
});

// api
const shortenBtn = document.querySelector("#shorten-btn");
const shortLinksList = document.querySelector("#short-links-list");

shortenBtn.addEventListener("click", () => {
	const fragment = document.createDocumentFragment();
	const div = fragment.appendChild(document.createElement("div"));
	const shortLink = fragment.appendChild(document.createElement("a"));
	const btn = fragment.appendChild(document.createElement("button"));
	div.classList.add("link-list");
	shortLink.classList.add("short-link");
	div.textContent = "long link";
	div.appendChild(document.createElement("hr"));
	div.appendChild(shortLink);
	shortLink.textContent = "a link";
	shortLinksList.appendChild(fragment);
	div.appendChild(btn);
	btn.classList.add("link-btn");
	btn.textContent = "Copy";

	btn.addEventListener("click", () => {
		btn.textContent = "Copied!";
		btn.style.backgroundColor = "var(--Purple-700)";
	});
});

// fetch("https://api.shrtco.de/v2/shorten?url=google.com")
// 	.then((response) => {
// 		console.log("resolved", response);
// 		return response.json();
// 	})
// 	.then((data) => {
// 		console.log(data);
// 	})
// 	.catch((err) => {
// 		console.log("error retrieving data", err);
// 	});
