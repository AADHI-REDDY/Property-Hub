import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import './PillNav.css';

export type PillNavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export interface PillNavProps {
  logo: React.ReactNode;
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  sliderColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  onMobileMenuClick?: () => void;
  initialLoadAnimation?: boolean;
}

const PillNav: React.FC<PillNavProps> = ({
  logo,
  items,
  activeHref,
  className = '',
  ease = 'power3.easeOut',
  baseColor = '#ffffff',
  pillColor = 'transparent',
  sliderColor = '#10b981', // Default green
  hoveredPillTextColor = '#ffffff',
  pillTextColor = '#1e293b',
  onMobileMenuClick,
  initialLoadAnimation = true
}) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
  const navItemsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, index) => {
        if (!circle?.parentElement) return;
        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;

        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`
        });

        const label = pill.querySelector<HTMLElement>('.pill-label');
        const white = pill.querySelector<HTMLElement>('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        tlRefs.current[index]?.kill();

        const tl = gsap.timeline({ paused: true });
        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 0.4, ease, overwrite: 'auto' }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 0.4, ease, overwrite: 'auto' }, 0);
        }
        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 0.4, ease, overwrite: 'auto' }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();
    const onResize = () => layout();
    window.addEventListener('resize', onResize);
    
    if (document.fonts?.ready) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    if (initialLoadAnimation) {
      const navItems = navItemsRef.current;
      if (navItems) {
        gsap.fromTo(navItems, 
          { width: 0, overflow: 'hidden' },
          { width: 'auto', duration: 0.8, ease }
        );
      }
    }

    return () => window.removeEventListener('resize', onResize);
  }, [items, ease, initialLoadAnimation]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (tl) {
        activeTweenRefs.current[i]?.kill();
        activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), { duration: 0.3, ease, overwrite: 'auto' });
    }
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (tl) {
        activeTweenRefs.current[i]?.kill();
        activeTweenRefs.current[i] = tl.tweenTo(0, { duration: 0.25, ease, overwrite: 'auto' });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    onMobileMenuClick?.();
  };

  // ✅ CSS Variables Mapping
  const cssVars = {
    '--base': baseColor,
    '--pill-bg': pillColor,
    '--slider-bg': sliderColor, 
    '--hover-text': hoveredPillTextColor,
    '--pill-text': resolvedPillTextColor
  } as React.CSSProperties;

  const isExternal = (href: string) => href.startsWith('http') || href.startsWith('#');

  return (
    <div className="pill-nav-container" style={cssVars}>
      <nav className={`pill-nav ${className}`} aria-label="Primary">
        <div className="pill-logo">
           {logo}
        </div>

        <div className="pill-nav-items desktop-only" ref={navItemsRef}>
          <ul className="pill-list">
            {items.map((item, i) => (
              <li key={item.href}>
                {isExternal(item.href) ? (
                    <a href={item.href} 
                       className={`pill ${activeHref === item.href ? 'is-active' : ''}`}
                       onMouseEnter={() => handleEnter(i)}
                       onMouseLeave={() => handleLeave(i)}>
                        <span className="hover-circle" ref={el => { circleRefs.current[i] = el; }} />
                        <span className="label-stack">
                            <span className="pill-label">{item.label}</span>
                            <span className="pill-label-hover" aria-hidden="true">{item.label}</span>
                        </span>
                    </a>
                ) : (
                    <Link to={item.href} 
                          className={`pill ${activeHref === item.href ? 'is-active' : ''}`}
                          onMouseEnter={() => handleEnter(i)}
                          onMouseLeave={() => handleLeave(i)}>
                        <span className="hover-circle" ref={el => { circleRefs.current[i] = el; }} />
                        <span className="label-stack">
                            <span className="pill-label">{item.label}</span>
                            <span className="pill-label-hover" aria-hidden="true">{item.label}</span>
                        </span>
                    </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <button 
          className={`mobile-menu-button mobile-only ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      <div className={`mobile-menu-popover ${isMobileMenuOpen ? 'is-open' : ''}`}>
        <ul className="mobile-menu-list">
          {items.map(item => (
            <li key={item.href}>
                <a href={item.href} className="mobile-menu-link">
                  {item.label}
                </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PillNav;