const aboutSection = document.querySelector(".about-section");
const aboutIntro = document.querySelector(".about-intro");
const questionBg = document.querySelector(".question-bg");
const aboutCards = document.querySelectorAll(".about-card");

let currentCard = -1;


window.addEventListener("scroll", () => {


    /*
    Position de la section
    */

    const sectionTop =
        aboutSection.offsetTop;


    /*
    Position du scroll dans la section
    */

    const scrollPosition =
        window.scrollY - sectionTop;


    /*
    Progression globale de la section
    */

    const progress =
        Math.max(
            0,
            Math.min(
                1,
                scrollPosition /
                (aboutSection.offsetHeight - window.innerHeight)
            )
        );


    /*
    Animation du titre
    */

    const animationProgress =
        Math.max(
            0,
            Math.min(
                1,
                (progress - 0.05) / 0.35
            )
        );


    /*
    Le titre rétrécit rapidement
    */

    const scale =
        1 - animationProgress * 0.55;


    /*
    Le titre se déplace vers la gauche
    */

    const moveX =
        -animationProgress * 400;


    aboutIntro.style.transform =
        `translateX(${moveX}px) scale(${scale})`;


    /*
    Les points d'interrogation disparaissent
    */

    questionBg.style.opacity =
        1 - animationProgress;



   const cardCount = aboutCards.length;


/*
Nombre total d'étapes :

0 = aucune carte
1 = carte 1 active
2 = carte 2 active
3 = carte 3 active
4 = carte 3 détachée
*/

const totalSteps =
    cardCount + 2;


/*
On garde un petit temps
avant que la première carte sorte
*/

const cardsProgress =
    Math.max(
        0,
        Math.min(
            1,
            (progress - 0.10) / 0.90
        )
    );


/*
Détermination de l'étape actuelle
*/

const currentStep =
    Math.floor(
        cardsProgress * totalSteps
    );


/*
On évite de dépasser
la dernière étape
*/

const step =
    Math.min(
        totalSteps - 1,
        currentStep
    );


/*
On change les cartes
uniquement quand l'étape change
*/

if (step !== currentCard) {

    currentCard =
        step;


    aboutCards.forEach((card, index) => {

        /*
        On retire les anciennes classes
        */

        card.classList.remove("active");
        card.classList.remove("detached");


        /*
        La carte actuelle sort
        */

        if (index === step - 1) {

            card.classList.add("active");

        }


        /*
        Les cartes précédentes
        se détachent
        */

        if (index < step - 1) {

            card.classList.add("detached");

        }

    });

}

});
/*Animation horizontale carousel de projets*/

const track = document.querySelector(".projets-track");

let position = 0;
function moveProjetcs(){
    position -= 1
    track.style.transform = 
    `translateX(${position}px)`;

    const cardWidth = firstCard.offsetWidth;

    const gap = 30;
}
/*Quand la première carte est sortie*/
 if (
        Math.abs(position)
        >= cardWidth + gap
    ) {

        track.appendChild(firstCard);

        position += cardWidth + gap;

        track.style.transform =
            `translateX(${position}px)`;

    }


    requestAnimationFrame(
        moveProjects
    );

moveProjects();
/* Apparition de la sphère quand on arrive sur la section */

const veilleSection = document.querySelector('.veille-section');
const sphere = document.querySelector('.veille-sphere');

let previousScroll = window.scrollY;

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            // On arrive sur la section
            veilleSection.classList.add('visible');

            sphere.classList.remove('exit-up');
            sphere.classList.remove('exit-down');

        } else {

            // On quitte la section
            veilleSection.classList.remove('visible');

            if (window.scrollY > previousScroll) {
                // On descend
                sphere.classList.add('exit-up');

            } else {
                // On remonte
                sphere.classList.add('exit-down');
            }
        }

        previousScroll = window.scrollY;

    });

}, {
    threshold: 0.2
});

observer.observe(veilleSection);


const profilIntroElements = document.querySelectorAll(
    ".profil-introduction > .profil-intro-number, .profil-introduction > h2, .profil-introduction > p"
);

if ("IntersectionObserver" in window) {
    const profilObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -30px 0px"
        }
    );

    profilIntroElements.forEach((element, index) => {
        element.style.transitionDelay = `${index * 120}ms`;
        profilObserver.observe(element);
    });
} else {
    profilIntroElements.forEach((element) => {
        element.classList.add("visible");
    });
}
