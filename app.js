const menuBtn = document.querySelector(".hamburger-wrapper");

menuBtn.addEventListener("click", () => {
	const nav = document.querySelector("nav");
	nav.classList.toggle("hidden");
});

// api
const shortenBtn = document.querySelector("#shorten-btn");
const shortLinksList = document.querySelector("#short-links-list");
const urlInput = document.querySelector("#url-input");

const shortBtn = () => {
	shortenBtn.addEventListener("click", () => {
		if (!urlInput.value == "") {
			const fragment = document.createDocumentFragment();
			const div = fragment.appendChild(document.createElement("div"));
			const p = fragment.appendChild(document.createElement("p"));
			const shortLink = fragment.appendChild(document.createElement("a"));
			const btn = fragment.appendChild(document.createElement("button"));

			shortLinksList.appendChild(fragment);
			div.appendChild(p);
			div.appendChild(document.createElement("hr"));
			div.appendChild(shortLink);
			div.appendChild(btn);

			div.classList.add("link-list");
			p.classList.add("link-text");
			shortLink.classList.add("short-link");
			btn.classList.add("link-btn");

			p.textContent = urlInput.value;

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
					const dataLink = data.result.short_link;
					const dataLink2 = data.result.short_link2;
					if (urlInput.value.length >= 25) {
						shortLink.textContent = `${dataLink}`;
					} else {
						shortLink.textContent = `${dataLink2}`;
					}
				})
				.catch((err) => {
					console.log("error retrieving data", err);
				});
		}
		urlInput.value = "";
	});
};

urlInput.addEventListener("input", () => {
	const regex =
		/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

	const invalid = document.querySelector(".invalid");
	// if (urlInput.value == "hello") {
	// 	shortBtn();
	// } else {
	// 	invalid.textContent = "Please add a link";
	// }
	if (urlInput.value.match(regex)) {
		shortBtn();
	} else {
		invalid.textContent = "Please add a link";
	}

	if (urlInput.value == "") {
		invalid.textContent = "";
	}
	console.log(urlInput.value);
});

// fetch
