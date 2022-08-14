const menuBtn = document.querySelector(".hamburger-wrapper");

menuBtn.addEventListener("click", () => {
	const nav = document.querySelector("nav");
	nav.classList.toggle("hidden");
});
