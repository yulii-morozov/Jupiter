'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, Transition  } from 'motion/react';
import { SectionAnimationEvent } from '../../hooks/useSectionManager';
import styles from './LowerFeesSection.module.css';
import backgroundImage from '../../assets/lower-fees-section-bg.png';
import Image from 'next/image';

interface LowerFeesSectionProps {
  isActive: boolean;
  isTransitioning: boolean;
  onRequestPrevSection: () => void;
  onRequestNextSection: () => void;
  animationEvent: SectionAnimationEvent;
}

interface SectionAnimation {
  initial?: { [key: string]: number | string };
  animate?: { [key: string]: number | string };
  transition: Transition;
}


const TRANSITION_SPEED = 0.8;
const SCROLL_DEBOUNCE_MS = 50;
const PARALLAX_EFFECT_RANGE = 300;

export const LowerFeesSection: React.FC<LowerFeesSectionProps> = ({
  isActive,
  isTransitioning,
  onRequestPrevSection,
  animationEvent,
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const lastWheelTime = useRef(0);
  const [scrollY, setScrollY] = useState(0);

  // Effect for handling native scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!isActive || isTransitioning) return;
      const now = Date.now();
      if (now - lastWheelTime.current < SCROLL_DEBOUNCE_MS) {
        e.preventDefault();
        return;
      }
      if (e.deltaY < 0 && el.scrollTop === 0) {
        lastWheelTime.current = now;
        onRequestPrevSection();
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [isActive, isTransitioning, onRequestPrevSection]);

  // Effect for parallax
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setScrollY(el.scrollTop);
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [isActive]);

  // Reset scroll on activate
  useEffect(() => {
    if (isActive && !isTransitioning && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [isActive, isTransitioning]);

  const getSectionAnimation = (): SectionAnimation => {
    const { type, scrollDirection } = animationEvent;
    const defaultTransition: Transition = { duration: TRANSITION_SPEED, ease: 'easeInOut' };

    if (type === 'section_closing') {
      const animateY = scrollDirection === 'down' ? '-100%' : '100%';
      return {
        initial: { y: 0, opacity: 1 },
        animate: { y: animateY, opacity: 0 },
        transition: defaultTransition,
      };
    }

    if (type === 'section_opening') {
      if (isTransitioning) {
        const initialY = scrollDirection === 'down' ? '100%' : '-100%';
        return {
          initial: { y: initialY, opacity: 1 },
          animate: { y: 0, opacity: 1 },
          transition: defaultTransition,
        };
      } else {
        return {
          initial: { y: 0, opacity: 1 },
          animate: { y: 0, opacity: 1 },
          transition: { duration: 0 },
        };
      }
    }

    return {
      initial: { y: 0, opacity: 1 },
      animate: { y: 0, opacity: 1 },
      transition: defaultTransition,
    };
  };


  const progress = Math.min(scrollY / PARALLAX_EFFECT_RANGE, 1);
  const parallaxY = progress * -80;
  const imageOpacity = animationEvent.type === 'section_closing' ? 0 : (1 - progress * 0.4);
  const sectionAnimation = getSectionAnimation();

  return (
      <motion.section
          className={styles.lowerFeesSection}
          initial={sectionAnimation.initial}
          animate={sectionAnimation.animate}
          transition={sectionAnimation.transition}
      >
        <div ref={scrollRef} className={styles.scrollContainer}>
          <div className={styles.mountainContainer} style={{ transform: `translate3d(0, ${parallaxY}px, 0)`, opacity: imageOpacity }}>
            <Image className={styles.mountains} src={backgroundImage.src} alt="Mountain background" />
          </div>
          <div className={styles.contentContainer} > {/*  style={{ opacity: textOpacity, transition: 'opacity 0.3s ease-in-out' }} */}
            <h1 className={styles.headline}>
              <div className={styles.tenXContainer}>
                <span className={`${styles.tenX} ${styles.tenXBlur}`}>10x</span>
                <span className={`${styles.tenX} ${styles.tenXTop}`}>10x</span>
              </div>
              <span className={styles.lowerFees}>Lower Fees</span>
            </h1>
            <p className={styles.supportText}>Jupiter Mobile has the lowest fees of any comparable Solana app or wallet.<br /><br />Trade safely, securely, with the most advanced liquidity system in DeFi and the best trade execution.</p>
          </div>
          <div className={styles.scrollSpacer}></div>
        </div>
      </motion.section>
  );
};