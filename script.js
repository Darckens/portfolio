/* Gestion du thème */
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

if (localStorage.getItem('theme') === 'light') {
    htmlElement.classList.remove('dark');
} else {
    htmlElement.classList.add('dark');
}

themeToggleBtn.addEventListener('click', () => {
    htmlElement.classList.toggle('dark');
    if (htmlElement.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

/* Typing text */
var typed = new Typed('#typing-text', {
    strings: [
        'Mathématicien.',
        'Data Analyst.', 
        'Business Analyst.', 
        'Étudiant en 2ème année de BUT en Science des Données.'
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true
});

/* Particules */
// 1. Configuration des particules
const particlesConfig = {
    "particles": {
        "number": {
            "value": 70, 
            "density": {"enable": true, "value_area": 1200} 
        },
        "color": { 
            "value": 
            "#3b82f6" 
        },
        "shape": {"type": "circle"},
        "opacity": { 
            "value": 0.5, 
            "random": false, 
            "anim": {
                "enable": false, 
                "speed": 1, 
                "opacity_min": 0.1, 
                "sync": false
            }
        },
        "size": {
             "value": 5,
              "random": true,
               "anim": { 
                "enable": false, 
                "speed": 40, 
                "size_min": 0.1, 
                "sync": false
            }
        },
        "line_linked": { 
            "enable": true, 
            "distance": 150, 
            "color": "#3b82f6", 
            "opacity": 0.3, 
            "width": 1 
        },
        "move": { 
            "enable": true, 
            "speed": 4, 
            "direction": "none", 
            "random": false, 
            "straight": false, 
            "out_mode": "out", 
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {"enable": true, "mode": "repulse"},
            "onclick": {"enable": true, "mode": "push"},
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {"opacity": 1}
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {"distance": 200},
            "push": {"particles_nb": 4},
            "remove": {"particles_nb": 2}
        }
    },
    "retina_detect": true
}

// 2. Définir le seuil critique (en pixels)
const MAX_SCREEN_WIDTH = 3000;

// 3. Fonction pour gérer le lancement ou l'arrêt
function manageParticles() {
    if (window.innerWidth <= MAX_SCREEN_WIDTH) {
        // On vérifie si les particules ne sont pas déjà lancées pour éviter les doublons
        if (!window.pJSDom || window.pJSDom.length === 0) {
            particlesJS("particles-js", particlesConfig);
            console.log("Particules activées (Largeur : " + window.innerWidth + "px)");
        }

    } else {
        // On vérifie si les particules existent, et on les détruit proprement
        if (window.pJSDom && window.pJSDom.length > 0) {
            window.pJSDom[0].pJS.fn.vendors.destroypJS();
            window.pJSDom = [];
            console.log("Particules désactivées pour performance (Largeur : " + window.innerWidth + "px)");
        }
    }
}

// 4. Lancement initial
manageParticles();

// 5. Écouteur intelligent sur le redimensionnement
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(manageParticles, 50);
});

/* Scroll Nav */
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener('scroll', () => {
    // A. Effet Verre
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // B. Soulignement automatique
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});

/* Bouton bot to top */
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

/* Projets : Navigation */
const track = document.getElementById('track');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

function getVisibleCards() {
    return [...document.querySelectorAll('#track .project-card')].filter(card => {
        const st = getComputedStyle(card);
        return st.display !== 'none' && st.visibility !== 'hidden' && card.offsetParent !== null;
    });
}

function getStep() {
    if (!track) return 372;
    return track.clientWidth; // page
}

function getMaxScroll() {
    if (!track) return 0;
    return Math.max(0, track.scrollWidth - track.clientWidth);
}

function getPositions() {
    if (!track) return [0];

    const cards = getVisibleCards();
    if (cards.length === 0) return [0];

    const step = Math.max(1, getStep());
    const maxScroll = getMaxScroll();

    const positions = [0];
    let pos = step;

    while (pos < maxScroll) {
        positions.push(pos);
        pos += step;
    }

    if (maxScroll > 0 && positions[positions.length - 1] !== maxScroll) {
        positions.push(maxScroll);
    }

    return positions;
}

function setActiveDot(index) {
    const dotsContainer = document.getElementById('projectDots');
    if (!dotsContainer) return;

    const dots = [...dotsContainer.querySelectorAll('.carousel-dot')];
    dots.forEach(d => d.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
}

function renderDots() {
    if (!track) return;

    const dotsContainer = document.getElementById('projectDots');
    if (!dotsContainer) return;

    const positions = getPositions();

    // reset
    dotsContainer.replaceChildren();

    positions.forEach((left, idx) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        dot.type = 'button';
        dot.setAttribute('aria-label', `Aller à la page ${idx + 1}`);

        dot.addEventListener('click', () => {
            track.scrollTo({ left, behavior: 'smooth' });
        });

        dotsContainer.appendChild(dot);
    });

    setActiveDot(0);
}

function updateActiveDotFromScroll() {
    if (!track) return;

    const dotsContainer = document.getElementById('projectDots');
    if (!dotsContainer) return;

    const positions = getPositions();
    if (positions.length === 0) return;

    const step = Math.max(1, getStep());
    const maxScroll = getMaxScroll();

    let index = Math.floor((track.scrollLeft + step / 2) / step);

    if (track.scrollLeft >= maxScroll - 1) {
        index = positions.length - 1;
    }

    const clamped = Math.max(0, Math.min(index, positions.length - 1));
    setActiveDot(clamped);
}

function scrollToNext() {
    if (!track) return;

    const step = Math.max(1, getStep());
    const maxScroll = getMaxScroll();
    const target = Math.min(track.scrollLeft + step, maxScroll);

    track.scrollTo({ left: target, behavior: 'smooth' });
}

function scrollToPrev() {
    if (!track) return;

    const step = Math.max(1, getStep());
    const target = Math.max(track.scrollLeft - step, 0);

    track.scrollTo({ left: target, behavior: 'smooth' });
}

if (track && nextBtn && prevBtn) {
    nextBtn.addEventListener('click', scrollToNext);
    prevBtn.addEventListener('click', scrollToPrev);

    track.addEventListener('scroll', () => {
        updateActiveDotFromScroll();
    }, { passive: true });

    window.addEventListener('resize', () => {
        renderDots();
        updateActiveDotFromScroll();
    });

    renderDots();
    updateActiveDotFromScroll();
}


/* Projets : Filtre*/
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const carouselTrack = document.getElementById('track');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 1. Gérer la classe 'active' sur les boutons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // 2. Récupérer le filtre choisi
            const filterValue = btn.getAttribute('data-filter');

            // 3. Remettre le carrousel au début (scroll à gauche)
            if(carouselTrack) {
                carouselTrack.scrollTo({ left: 0, behavior: 'smooth' });
            }

            // 4. Afficher ou masquer les cartes
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');

                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex'; 
                    card.style.opacity = '0';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    card.style.display = 'none'; 
                }
            });
            renderDots();
            updateActiveDotFromScroll();

        });
    });
}

/* Frise : Experience*/
const timelineSteps = document.querySelectorAll('.timeline-step');
const expDetails = document.querySelectorAll('.exp-detail-card');

timelineSteps.forEach(step => {
    step.addEventListener('click', () => {
        // 1. Retirer la classe active de tous les points
        timelineSteps.forEach(s => s.classList.remove('active'));
        
        // 2. Ajouter la classe active au point cliqué
        step.classList.add('active');
        
        // 3. Masquer tous les détails
        expDetails.forEach(detail => detail.classList.remove('active'));
        
        // 4. Afficher le détail correspondant (via data-target)
        const targetId = step.getAttribute('data-target');
        const targetDetail = document.getElementById(targetId);
        if (targetDetail) {
            targetDetail.classList.add('active');
        }
    });
});

/* Compétences : Système d'onglets */
const skillTabs = document.querySelectorAll('.skill-tab');
const skillContents = document.querySelectorAll('.skills-content');

if (skillTabs.length > 0) {
    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 1. Retirer la classe active de tous les onglets
            skillTabs.forEach(t => t.classList.remove('active'));
            
            // 2. Ajouter la classe active à l'onglet cliqué
            tab.classList.add('active');
            
            // 3. Masquer tous les contenus
            skillContents.forEach(content => content.classList.remove('active'));
            
            // 4. Afficher le contenu correspondant
            const target = tab.getAttribute('data-tab');
            const targetContent = document.getElementById(`tab-${target}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

/* Compteur de vues */
const counterWrapper = document.querySelector('.view-counter-wrapper');
const counterElement = document.getElementById('view-counter');

if (counterWrapper && counterElement) {
    fetch('https://api.counterapi.dev/v1/ibrahim-benkherfellah-portfolio/views/up')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur API');
            }
            return response.json();
        })
        .then(data => {
            // SUCCÈS : on affiche le nombre
            counterElement.innerText = data.count;
            counterWrapper.style.opacity = '1'; 
        })
        .catch(error => {
            // ÉCHEC (Bloqueur de pub ou hors ligne) : on cache
            console.log('Compteur masqué (AdBlock ou Erreur):', error);
            counterWrapper.style.display = 'none'; 
        });
}