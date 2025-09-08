'use client';

import React from 'react';
import { SectionAnimationEvent } from '@/hooks/useSectionManager';
import { ScrollEvent, useLocalScroll } from '@/hooks/useLocalScroll';
import styles from './FastestSection.module.css';

interface FastestSectionProps {
    isActive: boolean;
    isTransitioning: boolean;
    onRequestPrevSection: () => void;
    onRequestNextSection: () => void;
    animationEvent: SectionAnimationEvent;
}

export const FastestSection: React.FC<FastestSectionProps> = ({
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
            <div className={styles.content}>
                <span className={styles.badge}>NATIVELY-BUILT APP</span>
                <h1 className={styles.title}>
                    The Fastest. <span className={styles.highlight}>Period.</span>
                </h1>
                <p className={styles.subtitle}>
                    With natively-built apps on iOS and Android, Jupiter Mobile outperforms other apps.
                    In addition to its performance, Jupiter Mobile is full of helpful shortcuts that save you time.
                </p>
            </div>
        </section>
    );
};
