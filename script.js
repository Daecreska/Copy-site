/**
 * Landing Page - Custom Cursor, Scroll Animations, Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initScrollAnimations();
    initMobileNav();
    initSmoothScroll();
});

/**
 * Custom Cursor - Circle that follows mouse, scales on hover over clickables
 */
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursorFollower');

    if (!cursor || !cursorFollower) return;

    // Hide on touch devices and small screens
    const isTouchOrSmall = () => window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window;

    if (isTouchOrSmall()) {
        document.body.classList.add('no-custom-cursor');
        return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    const clickables = document.querySelectorAll('a, button, .service-card, .advantage-item, .testimonial-card, .blog-card, .btn');

    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Hover detection for clickable elements
    clickables.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });

    // Smooth cursor animation using requestAnimationFrame
    function animateCursor() {
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';

        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();
}

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
