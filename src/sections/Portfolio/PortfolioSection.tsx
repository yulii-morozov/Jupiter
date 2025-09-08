'use client';

import React from 'react';
import { SectionAnimationEvent } from '@/hooks/useSectionManager';
import { ScrollEvent, useLocalScroll } from '@/hooks/useLocalScroll';
import styles from './PortfolioSection.module.css';
import {RubyIcon} from "@/icons/RubyIcon";
import {WidgetIcon} from "@/icons/WidgetIcon";
import {SIcon} from "@/icons/SIcon";
import {TapIcon} from "@/icons/TapIcon";
import {AssetsIcon} from "@/icons/AssetsIcon";

interface PortfolioSectionProps {
    isActive: boolean;
    isTransitioning: boolean;
    onRequestPrevSection: () => void;
    onRequestNextSection: () => void;
    animationEvent?: SectionAnimationEvent;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
                                                                      isActive,
                                                                      isTransitioning,
                                                                      onRequestPrevSection,
                                                                      onRequestNextSection,
                                                                      animationEvent,
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
        <section className={styles.section} data-animation-event={animationEvent?.type ?? ''}>
            <div className={styles.inner}>
                <div className={styles.topRow}>
                    <div className={styles.left}>
                        <div className={styles.kicker}>JUPITER PORTFOLIO</div>

                        <h2 className={styles.title}>
                            All DeFi in <span className={styles.highlight}>One Place</span>
                        </h2>

                        <p className={styles.lead}>
                            Every token, every Solana DeFi position, and unclaimed airdrops — all together with
                            Jupiter Portfolio. Find money other wallets didn&apos;t know you had.
                        </p>

                        <div className={styles.pills}>
                            <div className={styles.pill}>
                                <RubyIcon />
                                <div className={styles.pillTitle}>Every DeFi Position.</div>
                                <div className={styles.pillSubtitle}>Together with your liquid tokens.</div>
                            </div>

                            <div className={styles.pill}>
                                <WidgetIcon/>
                                <div className={styles.pillTitle}>Find money.</div>
                                <div className={styles.pillSubtitle}>Discover airdrops you didn&apos;t know you had.</div>
                            </div>

                            <div className={styles.pill}>
                                <SIcon/>
                                <div className={styles.pillTitle}>70+ Protocols.</div>
                                <div className={styles.pillSubtitle}>Tracked and managed.</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.right}>
                        <div className={styles.cubesArea} aria-hidden />
                    </div>
                </div>

                <div className={styles.bottomGrid}>
                    <article className={`${styles.card} ${styles.leftCard}`}>
                        <AssetsIcon/>
                        <h3 className={styles.cardTitle}>Put your assets to work.</h3>
                        <p className={styles.cardText}>
                            Track every Solana DeFi token, position, and airdrop in one place — automatically.
                            No more missed assets or scattered apps.
                        </p>
                    </article>

                    <article className={`${styles.card} ${styles.rightCard}`}>
                        <TapIcon/>
                        <h3 className={styles.cardTitle}>Take action with one tap.</h3>
                        <p className={styles.cardText}>
                            Your ultimate DeFi command center. Unlock hidden assets and manage your entire
                            Solana presence from one sleek mobile app.
                        </p>

                        <div className={styles.phonePlaceholder} aria-hidden>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
};
