'use client';

import React, { useEffect, useRef, useState } from 'react';
import { SectionAnimationEvent } from '../../hooks/useSectionManager';
import styles from './LowerFeesSection.module.css';
import backgroundImage from "@/assets/lower-fees-section-bg.png"
import Image from 'next/image';
import {ScrollEvent, useLocalScroll} from "@/hooks/useLocalScroll";

interface LowerFeesSectionProps {
  isActive: boolean;
  isTransitioning: boolean;
  onRequestPrevSection: () => void;
  onRequestNextSection: () => void;
  animationEvent: SectionAnimationEvent;
}


const SCROLL_DEBOUNCE_MS = 50;
const PARALLAX_EFFECT_RANGE = 300;

export const LowerFeesSection: React.FC<LowerFeesSectionProps> = ({
  isActive,
  isTransitioning,
  onRequestPrevSection,
  onRequestNextSection,
animationEvent,
}) => {
  // const scrollRef = useRef<HTMLDivElement | null>(null);
  // const lastWheelTime = useRef(0);
  // const [scrollY, setScrollY] = useState(0);
  //
  // const handleScrollEvent = (event: ScrollEvent) => {
  //   if (event.type === 'next_section') {
  //     onRequestNextSection();
  //   }
  // };
  // useEffect(() => {
  //   const el = scrollRef.current;
  //   if (!el) return;
  //   const onWheel = (e: WheelEvent) => {
  //     if (!isActive || isTransitioning) return;
  //     const now = Date.now();
  //     if (now - lastWheelTime.current < SCROLL_DEBOUNCE_MS) {
  //       e.preventDefault();
  //       return;
  //     }
  //     if (e.deltaY < 0 && el.scrollTop === 0) {
  //       lastWheelTime.current = now;
  //       onRequestPrevSection();
  //     }
  //   };
  //   el.addEventListener('wheel', onWheel, { passive: false });
  //   return () => el.removeEventListener('wheel', onWheel);
  // }, [isActive, isTransitioning, onRequestPrevSection]);
  //
  // useEffect(() => {
  //   const el = scrollRef.current;
  //   if (!el) return;
  //   const onScroll = () => setScrollY(el.scrollTop);
  //   el.addEventListener('scroll', onScroll, { passive: true });
  //   return () => el.removeEventListener('scroll', onScroll);
  // }, [isActive]);
  //
  // useEffect(() => {
  //   if (isActive && !isTransitioning && scrollRef.current) {
  //     scrollRef.current.scrollTop = 0;
  //   }
  // }, [isActive, isTransitioning]);
  //
  //
  // const progress = Math.min(scrollY / PARALLAX_EFFECT_RANGE, 1);
  // const parallaxY = progress * -80;
  // const imageOpacity = animationEvent.type === 'section_closing' ? 0 : (1 - progress * 0.4);
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
          className={styles.lowerFeesSection}
      >
        <div
            // ref={scrollRef}
            className={styles.scrollContainer}>
          <div className={styles.mountainContainer}
               // style={{ transform: `translate3d(0, ${parallaxY}px, 0)`, opacity: imageOpacity }}
          >
            <Image
                className={styles.mountains}
                src={backgroundImage}
                alt="Mountain background"
            />
          </div>
          <div className={styles.contentContainer}>
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
      </div>
  );
};