'use client';

import React from 'react';
import { SectionAnimationEvent } from '@/hooks/useSectionManager';
import { ScrollEvent, useLocalScroll } from '@/hooks/useLocalScroll';
import styles from './MagicScanSection.module.css';
import { MiniArrowIcon } from '@/icons/MiniArrowIcon';
import phoneImage from '@/assets/phone.png';
import Image from 'next/image';
import {MagicIcon} from "@/icons/MagicIcon";

interface MagicScanSectionProps {
    isActive: boolean;
    isTransitioning: boolean;
    onRequestPrevSection: () => void;
    onRequestNextSection: () => void;
    animationEvent: SectionAnimationEvent;
}

export const MagicScanSection: React.FC<MagicScanSectionProps> = ({
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
        resetTrigger: isActive && !isTransitioning,
    });

    return (
        <section className={styles.section}>
            <div className={styles.badge}>
                <MagicIcon/>
                MAGIC SCAN
            </div>

            <h1 className={styles.title}>
                Cutting-<br />edge <span className={styles.highlight}>AI</span>
            </h1>

            <div className={styles.phoneWrapper}>
                <Image
                    src={phoneImage}
                    alt="Magic Scan preview"
                    className={styles.phoneImage}
                    width={100}
                    height={300}
                />
            </div>

            <div className={styles.textBlock}>
                <p>
                    With <span className={styles.accent}>Magic Scan</span>, open your camera and
                    find tokens and tickers in the wild and trade them instantly.
                </p>
                <p>
                    With <span className={styles.accent}>Magic Paste</span>, just paste a wallet
                    address, token, or link—Jupiter detects it and takes you straight to the right action.
                </p>
                <button className={styles.button}>
                    Watch Demo <MiniArrowIcon />
                </button>
            </div>
        </section>
    );
};
