// src/sections/Hero/HeroSection.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useLocalScroll } from '../../hooks/useLocalScroll';
import { SectionAnimationEvent } from '../../hooks/useSectionManager';
import { JupiterIcon } from '@/icons/JupiterIcon';
import { GoogleIcon } from '@/icons/GoogleIcon';
import styles from './HeroSection.module.css';
import { AppleBlackIcon } from '@/icons/AppleBlackIcon';
import heroBgImage from '../../assets/hero-bg.png';

interface HeroSectionProps {
  isActive: boolean;
  isTransitioning: boolean;
  onRequestPrevSection: () => void;
  onRequestNextSection: () => void;
  animationEvent: SectionAnimationEvent;
}

const TRANSITION_SPEED = 0.8;

export const HeroSection: React.FC<HeroSectionProps> = ({
                                                          isActive,
                                                          isTransitioning,
                                                          onRequestPrevSection,
                                                          onRequestNextSection,
                                                          animationEvent
                                                        }) => {
  const [localAnimationStage, setLocalAnimationStage] = useState(0);

  const scrollEvents = [
    { type: 'local_animation' as const, animationStep: 1 },
    { type: 'next_section' as const },
  ];

  const handleScrollEvent = (event: any) => {
    if (event.type === 'next_section') {
      onRequestNextSection();
    } else if (event.type === 'local_animation') {
      setLocalAnimationStage(event.animationStep || 0);
    }
  };

  useLocalScroll({
    scrollEvents,
    onScrollEvent: handleScrollEvent,
    onScrollUpFromTop: onRequestPrevSection,
    disabled: !isActive || isTransitioning,
    resetTrigger: isActive && !isTransitioning
  });

  // This function builds the animation props based on the event from the section manager.
  // Each section can have its own unique logic here.
  const getSectionAnimation = () => {
    const { type, scrollDirection } = animationEvent;

    if (type === 'section_closing') {
      // Animate this section out based on scroll direction.
      const animateY = scrollDirection === 'down' ? '-100%' : '100%';
      return {
        animate: { y: animateY, opacity: 1 },
        transition: { duration: TRANSITION_SPEED, ease: 'easeInOut' }
      };
    }

    if (type === 'section_opening') {
      if (isTransitioning) {
        // Animate this section in from the opposite direction of the scroll.
        const initialY = scrollDirection === 'down' ? '100%' : '-100%';
        return {
          initial: { y: initialY, opacity: 1 },
          animate: { y: 0, opacity: 1 },
          transition: { duration: TRANSITION_SPEED, ease: 'easeInOut' }
        };
      } else {
        // Section is stable and active.
        return { animate: { y: 0, opacity: 1 }, transition: { duration: 0 } };
      }
    }

    return {}; // Default case
  };

  const getContentAnimation = () => {
    if (animationEvent.type === 'section_closing') {
      return { opacity: 0, y: localAnimationStage === 1 ? -20 : 0 };
    }
    return { opacity: 1, y: localAnimationStage === 1 ? -20 : 0 };
  };

  const getBackgroundAnimation = () => {
    if (animationEvent.type === 'section_closing') {
      return { opacity: 0, scale: 0.95 };
    }
    return { opacity: 1, scale: localAnimationStage === 1 ? 1.05 : 1 };
  };

  const sectionAnimation = getSectionAnimation();

  return (
      <motion.section
          className={styles.hero}
          initial={sectionAnimation.initial}
          animate={sectionAnimation.animate}
          transition={sectionAnimation.transition}
      >
        <motion.div
            className={styles.background}
            animate={getBackgroundAnimation()}
            transition={{ duration: TRANSITION_SPEED, ease: "easeInOut" }}
        >
          <img src={heroBgImage.src} className={styles.backgroundImage} alt=""/>
        </motion.div>

        <motion.div
            className={styles.content}
            animate={getContentAnimation()}
            transition={{ duration: TRANSITION_SPEED, ease: "easeInOut" }}
        >
          <p className={styles.subtitle}><JupiterIcon /> Jupiter Mobile</p>
          <h1 className={styles.title}>The DeFi Superapp</h1>
          <p className={styles.description}>The 10x better trading, portfolio, and wallet app from Solana's top DeFi platform.</p>
          <div className={styles.buttons}>
            {/* Button components */}
          </div>
        </motion.div>
      </motion.section>
  );
};