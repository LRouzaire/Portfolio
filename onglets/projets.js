const projectCards = Array.from(document.querySelectorAll("[data-project-card]"));
const previousProjectButton = document.querySelector("[data-carousel-prev]");
const nextProjectButton = document.querySelector("[data-carousel-next]");
const projectCount = document.querySelector("[data-carousel-count]");

let activeProjectIndex = 0;

function showProject(index) {
    activeProjectIndex = (index + projectCards.length) % projectCards.length;

    projectCards.forEach((card, cardIndex) => {
        const isActive = cardIndex === activeProjectIndex;
        const isFlipped = isActive && card.classList.contains("is-flipped");

        card.hidden = !isActive;
        card.setAttribute("aria-label", `Projet ${cardIndex + 1} sur ${projectCards.length}`);

        if (!isActive) {
            card.classList.remove("is-flipped");
        }

        card.querySelector(".projet-card-front").setAttribute("aria-hidden", String(isFlipped));
        card.querySelector(".projet-card-back").setAttribute("aria-hidden", String(!isFlipped));
        card.querySelectorAll("[data-flip-button]").forEach((button) => {
            button.setAttribute("aria-expanded", String(isFlipped));
        });
    });

    projectCount.textContent =
        `${String(activeProjectIndex + 1).padStart(2, "0")} / ${String(projectCards.length).padStart(2, "0")}`;
}

previousProjectButton.addEventListener("click", () => {
    showProject(activeProjectIndex - 1);
});

nextProjectButton.addEventListener("click", () => {
    showProject(activeProjectIndex + 1);
});

projectCards.forEach((card) => {
    card.querySelectorAll("[data-flip-button]").forEach((button) => {
        button.addEventListener("click", () => {
            card.classList.toggle("is-flipped");
            const isFlipped = card.classList.contains("is-flipped");

            card.querySelector(".projet-card-front").setAttribute("aria-hidden", String(isFlipped));
            card.querySelector(".projet-card-back").setAttribute("aria-hidden", String(!isFlipped));
            card.querySelectorAll("[data-flip-button]").forEach((flipButton) => {
                flipButton.setAttribute("aria-expanded", String(isFlipped));
            });
        });
    });
});

showProject(activeProjectIndex);
