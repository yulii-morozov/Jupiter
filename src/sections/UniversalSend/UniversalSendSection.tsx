'use client';

import React from 'react';
import { SectionAnimationEvent } from '@/hooks/useSectionManager';
import { ScrollEvent, useLocalScroll } from '@/hooks/useLocalScroll';
import styles from './UniversalSendSection.module.css';
import {MiniArrowIcon} from "@/icons/MiniArrowIcon";

interface UniversalSendSectionProps {
    isActive: boolean;
    isTransitioning: boolean;
    onRequestPrevSection: () => void;
    onRequestNextSection: () => void;
    animationEvent: SectionAnimationEvent;
}

export const UniversalSendSection: React.FC<UniversalSendSectionProps> = ({
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
                <p className={styles.badge}>UNIVERSAL SEND</p>
                <h1 className={styles.title}>
                    Send Money to <span className={styles.highlight}>Anyone, Anywhere</span>
                </h1>
                <p className={styles.subtitle}>
                    With <span className={styles.accent}>Universal Send</span>, you can now send money —
                    SOL, USDC, or even memecoins — to anyone, anywhere. Even if they don’t have a wallet.
                </p>
                <button className={styles.button}>
                    Watch Demo
                    <MiniArrowIcon />
                </button>
            </div>
        </section>
    );
};
