const revealElements = document.querySelectorAll('.reveal');
const navLinks = document.querySelectorAll('.site-nav a');
const pageSections = document.querySelectorAll('main section[id]');
const openBookButton = document.getElementById('openBook');
const bookModal = document.getElementById('bookModal');
const closeBookButtons = document.querySelectorAll('[data-close-book]');
const bookNextButton = document.getElementById('bookNext');
const bookLeftImage = document.getElementById('bookLeftImage');
const bookRightImage = document.getElementById('bookRightImage');

const bookPages = [
    ['Dessin proj/dessin carte/animafi.png', 'Dessin proj/dessin carte/mifi.png'],
    ['Dessin proj/dessin carte/toadafi.png', 'Dessin proj/dessin carte/rapi.png'],
    ['Dessin proj/dessin carte/mafus.png', 'Dessin proj/dessin carte/marinard.png'],
    ['Dessin proj/dessin carte/mafinator.png', 'Dessin proj/dessin carte/magic-card.png']
];
let currentBookPage = 0;

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.18,
        rootMargin: '0px 0px -40px 0px'
    }
);

revealElements.forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            navLinks.forEach((link) => {
                const matchesSection = link.getAttribute('href') === `#${entry.target.id}`;
                link.style.color = matchesSection ? '#f2f2f2' : '#a9a9a9';
            });
        });
    },
    {
        threshold: 0.4
    }
);

pageSections.forEach((section) => sectionObserver.observe(section));

function openBookModal() {
    bookModal.classList.add('is-open');
    bookModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
}

function closeBookModal() {
    bookModal.classList.remove('is-open');
    bookModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
}

function showBookPage(index) {
    const [leftSrc, rightSrc] = bookPages[index];
    bookLeftImage.src = leftSrc;
    bookRightImage.src = rightSrc;
}

if (openBookButton && bookModal) {
    openBookButton.addEventListener('click', openBookModal);

    closeBookButtons.forEach((button) => {
        button.addEventListener('click', closeBookModal);
    });

    bookNextButton.addEventListener('click', () => {
        currentBookPage = (currentBookPage + 1) % bookPages.length;
        showBookPage(currentBookPage);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && bookModal.classList.contains('is-open')) {
            closeBookModal();
        }
    });

    showBookPage(currentBookPage);
}