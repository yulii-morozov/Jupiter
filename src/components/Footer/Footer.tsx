'use client';

import React from 'react';
import styles from './Footer.module.css';
import { SectionAnimationEvent } from '@/hooks/useSectionManager';
import { ScrollEvent, useLocalScroll } from '@/hooks/useLocalScroll';
import {JupiterIcon} from "@/icons/JupiterIcon";

interface FooterProps {
    isActive: boolean;
    isTransitioning: boolean;
    onRequestPrevSection: () => void;
    onRequestNextSection: () => void;
    animationEvent: SectionAnimationEvent;
}

export const Footer: React.FC<FooterProps> = ({
                                                  isActive,
                                                  isTransitioning,
                                                  onRequestPrevSection,
                                                  onRequestNextSection,
                                              }) => {
    const scrollEvents = [
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
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.brand}>
                    <div className={styles.logoRow}>
                        <JupiterIcon />
                        <h2 className={styles.title}>Jupiter Mobile</h2>
                    </div>
                    <p className={styles.description}>
                        Building the best decentralized trading platform & largest DAO in crypto.
                    </p>
                    <p className={styles.copy}>
                        © 2025 Jupiter Exchange All Rights Reserved
                    </p>
                </div>

                <div className={styles.links}>
                    <div className={styles.linkGroup}>
                        <h4 className={styles.groupTitle}>Spot</h4>
                        <a href="#">Swap</a>
                        <a href="#">Limit Order</a>
                        <a href="#">DCA</a>
                        <a href="#">VA</a>
                    </div>

                    <div className={styles.linkGroup}>
                        <h4 className={styles.groupTitle}>Perps</h4>
                        <a href="#">Trade</a>
                        <a href="#">JLP</a>
                        <h4 className={styles.groupTitle}>More</h4>
                        <a href="#">Bridge</a>
                    </div>

                    <div className={styles.linkGroup}>
                        <h4 className={styles.groupTitle}>Quick Start</h4>
                        <a href="#">LFG Launchpad</a>
                        <a href="#">Jup Research</a>
                        <a href="#">Governance</a>
                    </div>

                    <div className={styles.linkGroup}>
                        <h4 className={styles.groupTitle}>Resources</h4>
                        <a href="#">Docs</a>
                        <a href="#">Guides</a>
                        <a href="#">Blog</a>
                    </div>
                </div>
            </div>

            <div className={styles.terms}>
                <a href="#">Terms & Conditions</a>
            </div>
        </footer>
    );
};
