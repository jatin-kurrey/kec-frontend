// useFadeInScroll.js
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useFadeInScroll = (selector = '.fade-in', options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll(selector), {
        opacity: 0,
        y: 50,
        duration: options.duration || 0.8,
        stagger: options.stagger || 0.15,
        ease: options.ease || 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: options.start || 'top 80%',
          toggleActions: 'play none none none', // animate only on scroll
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [selector, options]);

  return ref;
};

export default useFadeInScroll;
