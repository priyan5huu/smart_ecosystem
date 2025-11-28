import gsap from 'gsap';

/**
 * GSAP Animation Utilities for Awwwards-level interactions
 */

// Page transition animations
export const pageTransition = {
    fadeIn: (element: HTMLElement | string, options = {}) => {
        return gsap.from(element, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out',
            ...options,
        });
    },

    fadeOut: (element: HTMLElement | string, options = {}) => {
        return gsap.to(element, {
            opacity: 0,
            y: -30,
            duration: 0.6,
            ease: 'power3.in',
            ...options,
        });
    },

    slideUp: (element: HTMLElement | string, options = {}) => {
        return gsap.from(element, {
            opacity: 0,
            y: 60,
            duration: 1,
            ease: 'power4.out',
            ...options,
        });
    },

    scaleIn: (element: HTMLElement | string, options = {}) => {
        return gsap.from(element, {
            opacity: 0,
            scale: 0.8,
            duration: 0.8,
            ease: 'back.out(1.7)',
            ...options,
        });
    },
};

// Stagger animations for multiple elements
export const staggerAnimation = (
    elements: HTMLElement[] | NodeListOf<Element> | string,
    options = {}
) => {
    return gsap.from(elements, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        ...options,
    });
};

// Continuous animations
export const continuousAnimations = {
    float: (element: HTMLElement | string, options = {}) => {
        return gsap.to(element, {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            ...options,
        });
    },

    pulse: (element: HTMLElement | string, options = {}) => {
        return gsap.to(element, {
            scale: 1.05,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            ...options,
        });
    },

    glow: (element: HTMLElement | string, options = {}) => {
        return gsap.to(element, {
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.6)',
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            ...options,
        });
    },

    shimmer: (element: HTMLElement | string) => {
        return gsap.fromTo(
            element,
            {
                backgroundPosition: '-200% center',
            },
            {
                backgroundPosition: '200% center',
                duration: 3,
                repeat: -1,
                ease: 'none',
            }
        );
    },
};

// Text animations
export const textAnimations = {
    // Letter-by-letter reveal
    revealLetters: (element: HTMLElement | string, options = {}) => {
        const el = typeof element === 'string' ? document.querySelector(element) : element;
        if (!el) return;

        const text = el.textContent || '';
        el.innerHTML = text
            .split('')
            .map((char) => `<span class="inline-block opacity-0">${char === ' ' ? '&nbsp;' : char}</span>`)
            .join('');

        return gsap.to(`${typeof element === 'string' ? element : ''} span`, {
            opacity: 1,
            y: 0,
            duration: 0.05,
            stagger: 0.03,
            ease: 'power2.out',
            ...options,
        });
    },

    // Typewriter effect
    typewriter: (element: HTMLElement, text: string, speed = 50) => {
        let i = 0;
        element.textContent = '';

        return new Promise((resolve) => {
            const interval = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(interval);
                    resolve(true);
                }
            }, speed);
        });
    },

    // Gradient text animation
    gradientShift: (element: HTMLElement | string) => {
        return gsap.to(element, {
            backgroundPosition: '200% center',
            duration: 3,
            repeat: -1,
            ease: 'none',
        });
    },
};

// Hover effects
export const hoverEffects = {
    lift: (element: HTMLElement) => {
        const tl = gsap.timeline({ paused: true });
        tl.to(element, {
            y: -8,
            scale: 1.02,
            boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
            duration: 0.3,
            ease: 'power2.out',
        });
        return tl;
    },

    glow: (element: HTMLElement, color = 'rgba(59, 130, 246, 0.6)') => {
        const tl = gsap.timeline({ paused: true });
        tl.to(element, {
            boxShadow: `0 0 30px ${color}`,
            duration: 0.3,
            ease: 'power2.out',
        });
        return tl;
    },

    scale: (element: HTMLElement, scaleValue = 1.05) => {
        const tl = gsap.timeline({ paused: true });
        tl.to(element, {
            scale: scaleValue,
            duration: 0.3,
            ease: 'back.out(1.7)',
        });
        return tl;
    },
};

// Number counter animation
export const animateCounter = (
    element: HTMLElement,
    start: number,
    end: number,
    duration = 2,
    decimals = 0
) => {
    const obj = { value: start };

    return gsap.to(obj, {
        value: end,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
            element.textContent = obj.value.toFixed(decimals);
        },
    });
};

// Scroll-triggered animations
export const scrollAnimations = {
    fadeInUp: (element: HTMLElement | string, options = {}) => {
        return gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            },
            opacity: 0,
            y: 60,
            duration: 1,
            ease: 'power3.out',
            ...options,
        });
    },

    parallax: (element: HTMLElement | string, speed = 0.5) => {
        return gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
            y: (i, target) => -target.offsetHeight * speed,
            ease: 'none',
        });
    },
};

// Route transition helper
export const routeTransition = async (
    onLeave: () => void,
    onEnter: () => void
) => {
    // Fade out current page
    await gsap.to('.page-content', {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: 'power2.in',
    });

    // Execute route change
    onLeave();

    // Small delay
    await new Promise(resolve => setTimeout(resolve, 100));

    // Fade in new page
    onEnter();

    await gsap.from('.page-content', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'power2.out',
    });
};
