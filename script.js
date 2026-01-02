document.addEventListener('DOMContentLoaded', () => {

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Don't prevent default for download links or external links
            if (this.hasAttribute('download') || this.getAttribute('href').startsWith('http')) {
                return;
            }
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Menu Toggle
    const navToggle = document.querySelector('.colorlib-nav-toggle');
    const body = document.body;

    if (navToggle) {
        navToggle.addEventListener('click', (e) => {
            e.preventDefault();
            if (body.classList.contains('offcanvas')) {
                body.classList.remove('offcanvas');
            } else {
                body.classList.add('offcanvas');
            }
        });
    }

    // Highlighting Active Section in Sidebar
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('#colorlib-main-menu ul li');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('data-section');
            }
        });

        navLi.forEach(li => {
            li.classList.remove('active');
            if (li.querySelector('a').getAttribute('data-nav-section') === current) {
                li.classList.add('active');
            }
        });
    });

    // Hero Slider
    const slides = document.querySelectorAll('.slides li');
    let currentSlide = 0;

    if (slides.length > 0) {
        slides[0].classList.add('active-slide');
        setInterval(() => {
            slides[currentSlide].classList.remove('active-slide');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active-slide');
        }, 5000);
    }

    // Scroll Reveal Animation using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => revealObserver.observe(el));

});
