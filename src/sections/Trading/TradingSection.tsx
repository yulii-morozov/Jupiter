// src/sections/Trading/TradingSection.tsx

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { SectionAnimationEvent } from '../../hooks/useSectionManager';
import styles from './TradingSection.module.css';
import phoneImage from '../../assets/iphone14.png';
import bgImage from '../../assets/trading-section-bg.png';

interface TradingSectionProps {
  isActive: boolean;
  isTransitioning: boolean;
  onRequestPrevSection: () => void;
  onRequestNextSection: () => void;
  animationEvent: SectionAnimationEvent;
}

const TRANSITION_SPEED = 0.8;
const SCROLL_DEBOUNCE_MS = 50;
const BG_HEIGHT_PX = 1000;

export const TradingSection: React.FC<TradingSectionProps> = ({
  isActive,
  isTransitioning,
  onRequestPrevSection,
  onRequestNextSection,
  animationEvent,
}) => {
  const [localAnimationStage, setLocalAnimationStage] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const lastWheelTime = useRef(0);

  // Effect for handling native scroll within the component
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
      const { scrollTop, scrollHeight, clientHeight } = el;
      if (e.deltaY < 0 && scrollTop === 0) {
        lastWheelTime.current = now;
        onRequestPrevSection();
      } else if (e.deltaY > 0 && Math.ceil(scrollTop + clientHeight) >= scrollHeight) {
        lastWheelTime.current = now;
        onRequestNextSection();
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [isActive, isTransitioning, onRequestPrevSection, onRequestNextSection]);

  // Effect for local animations based on scroll position
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setLocalAnimationStage(el.scrollTop > 100 ? 1 : 0);
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [isActive]);

  // Reset scroll on activate
  useEffect(() => {
    if (isActive && !isTransitioning && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [isActive, isTransitioning]);

  // Custom animation logic for the Trading section.
  const getSectionAnimation = () => {
    const { type, scrollDirection } = animationEvent;

    if (type === 'section_closing') {
      const animateY = scrollDirection === 'down' ? '-100%' : '100%';
      return {
        animate: { y: animateY, opacity: 1 },
        transition: { duration: TRANSITION_SPEED, ease: 'easeInOut' }
      };
    }

    if (type === 'section_opening') {
      if (isTransitioning) {
        const initialY = scrollDirection === 'down' ? '100%' : '-100%';
        return {
          initial: { y: initialY, opacity: 1 },
          animate: { y: 0, opacity: 1 },
          transition: { duration: TRANSITION_SPEED, ease: 'easeInOut' }
        };
      } else {
        return { animate: { y: 0, opacity: 1 }, transition: { duration: 0 } };
      }
    }
    return {};
  };

  const getContentAnimations = () => {
    if (animationEvent.type === 'section_closing') {
      return {
        text: { opacity: 0, x: -50 },
        phone: { opacity: 0, y: 50, scale: 0.9 }
      };
    }
    return {
      text: { opacity: 1, x: 0 },
      phone: localAnimationStage === 1 ?
          { opacity: 1, y: -20, scale: 1.05 } :
          { opacity: 1, y: 0, scale: 1 }
    };
  };

  const sectionAnimation = getSectionAnimation();
  const contentAnimations = getContentAnimations();

  return (
      <motion.section
          className={styles.tradingSection}
          initial={sectionAnimation.initial}
          animate={sectionAnimation.animate}
          transition={sectionAnimation.transition}
      >
        <div ref={scrollRef} className={styles.scrollContainer} style={{ paddingBottom: `${BG_HEIGHT_PX}px` }}>
          <img src={bgImage.src} alt="" aria-hidden className={styles.backgroundImage} style={{ height: `${BG_HEIGHT_PX}px` }}/>
          <div className={styles.container}>
            <motion.div className={styles.textContainer} animate={contentAnimations.text} transition={{ duration: 0.6, ease: 'easeOut' }}>
              <p className={styles.label}>One-Tap Trading</p>
              <h2 className={styles.title}>Trade on the <b className={styles.titleHighlight}>#1 DeFi Platform</b></h2>
              <p className={styles.description}>Access tens of millions of Solana tokens with the most comprehensive coverage. Spot trade, set limit orders, DCA (dollar-cost average) into anything from SOL to memecoins.</p>
            </motion.div>
            <motion.div className={styles.phoneContainer} animate={contentAnimations.phone} transition={{ duration: TRANSITION_SPEED, ease: 'easeInOut' }}>
              <div className={styles.phoneMockup}><img src={phoneImage.src} className={styles.phoneImage} alt="Phone mockup" /></div>
            </motion.div>
            <div className={styles.scrollSpacer}></div>
          </div>
        </div>
      </motion.section>
  );
};