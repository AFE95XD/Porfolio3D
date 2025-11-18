import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Sistema de scroll suave y animaciones
 */
export class ScrollAnimations {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
    this.lenis = null;
    this.init();
  }

  init() {
    // Inicializar Lenis para smooth scroll
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2
    });

    // Conectar Lenis con GSAP ScrollTrigger
    this.lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      this.lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Actualizar posición de scroll en SceneManager
    this.lenis.on('scroll', ({ scroll }) => {
      if (this.sceneManager) {
        this.sceneManager.updateScroll(scroll);
      }
    });
  }

  // Fade in elements on scroll
  setupFadeIn(selector = '.fade-in') {
    const elements = document.querySelectorAll(selector);

    elements.forEach((el) => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'top 50%',
            scrub: false,
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }

  // Parallax effect para elementos
  setupParallax(selector, speed = 0.5) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((el) => {
      gsap.to(el, {
        y: () => `-${window.innerHeight * speed}px`,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
  }

  // Escala elementos en scroll
  setupScale(selector, scaleFrom = 0.8, scaleTo = 1) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { scale: scaleFrom },
        {
          scale: scaleTo,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'top 30%',
            scrub: true
          }
        }
      );
    });
  }

  // Rotar elementos en scroll
  setupRotate(selector, rotation = 360) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((el) => {
      gsap.to(el, {
        rotation: rotation,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
  }

  // Animación de texto revelado
  setupTextReveal(selector) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((el) => {
      const text = el.textContent;
      el.textContent = '';

      const chars = text.split('');
      chars.forEach((char) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        el.appendChild(span);
      });

      const spans = el.querySelectorAll('span');

      gsap.to(spans, {
        opacity: 1,
        y: 0,
        duration: 0.05,
        stagger: 0.02,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }

  // Pin section (fijar sección mientras se hace scroll)
  setupPinSection(selector, duration = 1) {
    ScrollTrigger.create({
      trigger: selector,
      start: 'top top',
      end: `+=${window.innerHeight * duration}`,
      pin: true,
      pinSpacing: true,
      scrub: true
    });
  }

  // Animación de progreso horizontal
  setupHorizontalScroll(containerSelector, itemsSelector) {
    const container = document.querySelector(containerSelector);
    const items = document.querySelector(itemsSelector);

    if (!container || !items) return;

    const scrollWidth = items.scrollWidth - container.offsetWidth;

    gsap.to(items, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });
  }

  // Cambiar color de fondo basado en sección
  setupBackgroundColor(sections) {
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section.element,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          gsap.to('body', {
            backgroundColor: section.color,
            duration: 0.5
          });
        },
        onEnterBack: () => {
          gsap.to('body', {
            backgroundColor: section.color,
            duration: 0.5
          });
        }
      });
    });
  }

  // Stagger animation para listas
  setupStagger(selector, staggerAmount = 0.1) {
    const elements = document.querySelectorAll(selector);

    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: staggerAmount,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: elements[0],
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }

  // Scroll to section
  scrollToSection(target, offset = 0) {
    const element = document.querySelector(target);
    if (element) {
      this.lenis.scrollTo(element, {
        offset: offset,
        duration: 1.5,
        easing: (t) => 1 - Math.pow(1 - t, 3)
      });
    }
  }

  // Destruir animaciones
  destroy() {
    if (this.lenis) {
      this.lenis.destroy();
    }
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }
}
