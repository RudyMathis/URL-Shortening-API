const menu = () => {
	const menuBtn = document.querySelector(".hamburger-wrapper");

	menuBtn.addEventListener("click", () => {
		const nav = document.querySelector("nav");
		nav.classList.toggle("hidden");
	});
};
menu();

const invalid = document.querySelector(".invalid");
const shorten = document.querySelector(".shorten");

const reset = () => {
	if (urlInput.value == "") {
		shorten.style.color = "var(--Purple-900";
		shorten.style.outline = "none";
		invalid.textContent = "";
	}
};

const error = () => {
	shorten.style.color = "var(--Red-400)";
	shorten.style.outline = "2px solid var(--Red-400)";
	invalid.textContent = "Please add a link";
};

const regex =
	/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

// api
const urlInput = document.querySelector("#url-input");

const shortBtn = () => {
	const shortenBtn = document.querySelector("#shorten-btn");
	shortenBtn.addEventListener("click", () => {
		if (!urlInput.value == "" && urlInput.value.match(regex)) {
			const shortLinksList = document.querySelector("#short-links-list");
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
		reset();
	});
};

const userInput = () => {
	if (urlInput.value.match(regex)) {
		shortBtn();
	} else {
		error();
	}
	reset();
};

urlInput.addEventListener("input", userInput);
