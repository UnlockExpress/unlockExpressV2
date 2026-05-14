// Header scroll
window.addEventListener('scroll', () => {
    document.getElementById('header').classList.toggle('scrolled', window.scrollY > 100);
});


//MENU HAMBURGER
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', (e) => {
    e.stopPropagation()
    hamburger.classList.toggle('active');  // anime le hamburger
    navLinks.classList.toggle('open');     // ouvre/ferme le menu

    if (navLinks.classList.contains('open')) {
        document.querySelectorAll('.nav-links li a').forEach((link) => {
            link.addEventListener('click', (e) => {
                e.stopPropagation()
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
            })
        })

        document.body.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        })
    }
});


/*BUTTON DE NAVIGUATION*/
// Scroll vers le bas (vers la prochaine section)
document.getElementById("scroll-down").addEventListener("click", () => {
    window.scrollBy({
        top: window.innerHeight,
        behavior: "smooth"
    });
});

// Scroll vers le haut
document.getElementById("scroll-up").addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Affichage intelligent du bouton "up"
window.addEventListener("scroll", () => {
    const upBtn = document.getElementById("scroll-up");

    if (window.scrollY > 300) {
        upBtn.classList.add("show");
    } else {
        upBtn.classList.remove("show");
    }
});

