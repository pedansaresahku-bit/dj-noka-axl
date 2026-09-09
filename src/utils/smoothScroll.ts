import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export const initSmoothScroll = (): Lenis => {
  if (typeof window === 'undefined') return null as any;

  if (lenisInstance) {
    return lenisInstance;
  }

  // Create Lenis instance with tuned physics for responsive, ultra-smooth scrolling
  lenisInstance = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.5,
    infinite: false,
    autoRaf: false, // We drive via dedicated RAF loop for perfect sync
  });

  // Dedicated RAF animation loop with high precision
  let rafId: number;
  const raf = (time: number) => {
    lenisInstance?.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);

  // Store on window for global accessibility
  (window as any).__lenis = lenisInstance;

  // Cleanup handler if needed
  window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(rafId);
    lenisInstance?.destroy();
    lenisInstance = null;
  });

  return lenisInstance;
};

export const getLenis = (): Lenis | null => {
  return lenisInstance || (typeof window !== 'undefined' ? (window as any).__lenis || null : null);
};

export const scrollToTarget = (target: string | HTMLElement, offset: number = -60) => {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(target, {
      offset,
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else if (typeof document !== 'undefined') {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

export const pauseScroll = () => {
  const lenis = getLenis();
  lenis?.stop();
};

export const resumeScroll = () => {
  const lenis = getLenis();
  lenis?.start();
};

