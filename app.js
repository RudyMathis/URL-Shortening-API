const menuBtn = document.querySelector(".hamburger-wrapper");

menuBtn.addEventListener("click", () => {
	const nav = document.querySelector("nav");
	nav.classList.toggle("hidden");
});

// api
const shortenBtn = document.querySelector("#shorten-btn");
const shortLinksList = document.querySelector("#short-links-list");
const urlInput = document.querySelector("#url-input");

shortenBtn.addEventListener("click", () => {
	const fragment = document.createDocumentFragment();
	const div = fragment.appendChild(document.createElement("div"));
	const h2 = fragment.appendChild(document.createElement("h2"));
	const shortLink = fragment.appendChild(document.createElement("a"));
	const btn = fragment.appendChild(document.createElement("button"));

	shortLinksList.appendChild(fragment);
	div.appendChild(h2);
	div.appendChild(document.createElement("hr"));
	div.appendChild(shortLink);
	div.appendChild(btn);

	div.classList.add("link-list");
	shortLink.classList.add("short-link");
	btn.classList.add("link-btn");

	h2.textContent = urlInput.value;

	btn.textContent = "Copy";
	btn.addEventListener("click", () => {
		btn.textContent = "Copied!";
		btn.style.backgroundColor = "var(--Purple-700)";

		navigator.clipboard.writeText(shortLink.textContent);
	});

	fetch(`https://api.shrtco.de/v2/shorten?url=${urlInput.value}`)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			const dataLink = data.result.full_short_link;
			shortLink.textContent = `${dataLink}`;
		})
		.catch((err) => {
			console.log("error retrieving data", err);
		});

	urlInput.value = "";
});

urlInput.addEventListener("input", (e) => {
	e.preventDefault();
	console.log(urlInput.value);
});
