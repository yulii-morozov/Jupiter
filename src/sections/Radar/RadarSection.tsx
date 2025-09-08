'use client';

import React from 'react';
import { SectionAnimationEvent } from '@/hooks/useSectionManager';
import { ScrollEvent, useLocalScroll } from '@/hooks/useLocalScroll';
import styles from './RadarSection.module.css';
import {RadarIcon} from "@/icons/RadarIcon";

interface RadarSectionProps {
    isActive: boolean;
    isTransitioning: boolean;
    onRequestPrevSection: () => void;
    onRequestNextSection: () => void;
    animationEvent: SectionAnimationEvent;
}

export const RadarSection: React.FC<RadarSectionProps> = ({
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
                <RadarIcon />
                RADAR
            </div>

            <h1 className={styles.title}>
                Never miss a <span className={styles.highlight}>beat.</span>
            </h1>

            <p className={styles.subtitle}>
                <span className={styles.accent}>Radar</span> gives you real-time alerts tailored
                to your wallet — airdrop notifications, position updates, protocol news, and more.
            </p>
        </section>
    );
};
