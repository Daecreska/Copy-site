/**
 * Landing Page - Custom Cursor, Scroll Animations, Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initMobileNav();
    initSmoothScroll();
});

/**
 * Scroll Animations - IntersectionObserver for fade-up and staggered effects
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    if (!animatedElements.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const parent = el.parentElement;
                const siblings = parent ? [...parent.querySelectorAll('[data-animate]')] : [el];
                const index = siblings.indexOf(el);

                el.classList.add('animate-in');
                el.classList.add(`animate-stagger-${Math.min(index + 1, 6)}`);
            }
        });
    }, observerOptions);

    animatedElements.forEach((el) => observer.observe(el));
}

/**
 * Mobile Navigation Toggle
 */
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const nav = document.querySelector('.nav');

    if (!navToggle || !nav) return;

    navToggle.addEventListener('click', () => {
        nav.classList.toggle('nav--open');
        navToggle.classList.toggle('nav-toggle--active');
        document.body.classList.toggle('nav-open');
    });

    // Close on link click (for anchor links)
    nav.querySelectorAll('.nav__link').forEach((link) => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav--open');
            navToggle.classList.remove('nav-toggle--active');
            document.body.classList.remove('nav-open');
        });
    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}
