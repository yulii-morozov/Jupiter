// src/sections/Hero/HeroSection.tsx

'use client';

import React from 'react';
import {ScrollEvent, useLocalScroll} from '../../hooks/useLocalScroll';
import { SectionAnimationEvent } from '../../hooks/useSectionManager';
import { JupiterIcon } from '@/icons/JupiterIcon';
import styles from './HeroSection.module.css';
import heroBg from "@/assets/hero-bg.png";
import Image from "next/image";
import {AppleBlackIcon} from "@/icons/AppleBlackIcon";
import {GoogleIcon} from "@/icons/GoogleIcon";

interface HeroSectionProps {
  isActive: boolean;
  isTransitioning: boolean;
  onRequestPrevSection: () => void;
  onRequestNextSection: () => void;
  animationEvent: SectionAnimationEvent;
}



export const HeroSection: React.FC<HeroSectionProps> = ({
                                                          isActive,
                                                          isTransitioning,
                                                          onRequestPrevSection,
                                                          onRequestNextSection,
                                                        }) => {

  const scrollEvents = [
    { type: 'local_animation' as const, animationStep: 1 },
    { type: 'next_section' as const },
  ];

  const handleScrollEvent = (event: ScrollEvent) => {
    if (event.type === 'next_section') {
      onRequestNextSection();
    }
  };

  useLocalScroll({
    scrollEvents,
    onScrollEvent: handleScrollEvent,
    onScrollUpFromTop: onRequestPrevSection,
    disabled: !isActive || isTransitioning,
    resetTrigger: isActive && !isTransitioning
  });

  return (
      <div
          className={styles.hero}
      >
        <div
            className={styles.background}
        >
          <Image src={heroBg} className={styles.backgroundImage} alt="Hero background" />
        </div>

        <div
            className={styles.content}
        >
          <p className={styles.subtitle}>
            <JupiterIcon /> Jupiter Mobile</p>
          <h1 className={styles.title}>The DeFi Superapp</h1>
          <p className={styles.description}>The 10x better trading, portfolio, and wallet app from Solana&apos;s top DeFi platform.</p>
          <div className={styles.buttons}>

            <div className={styles.storeBtn}>
              <AppleBlackIcon />
              <div className={styles.textBlock}>
                <div className={styles.smallText}>Get it on</div>
                <div className={styles.storeText}>App Store</div>
              </div>
            </div>

            <div className={styles.storeBtn}>
              <GoogleIcon />
              <div className={styles.textBlock}>
                <div className={styles.smallText}>Download on</div>
                <div className={styles.storeText}>Google Play</div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};