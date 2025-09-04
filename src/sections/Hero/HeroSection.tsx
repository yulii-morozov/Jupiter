// src/sections/Hero/HeroSection.tsx

'use client';

import React, { useState } from 'react';
import { motion, Transition } from 'motion/react';
import {ScrollEvent, useLocalScroll} from '../../hooks/useLocalScroll';
import { SectionAnimationEvent } from '../../hooks/useSectionManager';
import { JupiterIcon } from '@/icons/JupiterIcon';
import styles from './HeroSection.module.css';
import heroBgImage from '../../assets/hero-bg.png';
import Image from "next/image";

interface HeroSectionProps {
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

  const handleScrollEvent = (event: ScrollEvent) => {
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
          <Image src={heroBgImage.src} className={styles.backgroundImage} alt=""/>
        </motion.div>

        <motion.div
            className={styles.content}
            animate={getContentAnimation()}
            transition={{ duration: TRANSITION_SPEED, ease: "easeInOut" }}
        >
          <p className={styles.subtitle}><JupiterIcon /> Jupiter Mobile</p>
          <h1 className={styles.title}>The DeFi Superapp</h1>
          <p className={styles.description}>The 10x better trading, portfolio, and wallet app from Solana&apos;s top DeFi platform.</p>
          <div className={styles.buttons}>
            {/* Button components */}
          </div>
        </motion.div>
      </motion.section>
  );
};