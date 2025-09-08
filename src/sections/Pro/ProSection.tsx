'use client';

import React from 'react';
import { SectionAnimationEvent } from '@/hooks/useSectionManager';
import styles from './ProSection.module.css';
import { ScrollEvent, useLocalScroll } from '@/hooks/useLocalScroll';
import first from "@/assets/Tokens/first.png";
import Image from "next/image";
import {JupiterIcon} from "@/icons/JupiterIcon";
import {StartSelectIcon} from "@/icons/StarSelectIcon";

interface ProSectionProps {
    isActive: boolean;
    isTransitioning: boolean;
    onRequestPrevSection: () => void;
    onRequestNextSection: () => void;
    animationEvent: SectionAnimationEvent;
}

export const ProSection: React.FC<ProSectionProps> = ({
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
            <div className={styles.jupiter_pro}>Jupiter Pro</div>
            <div className={styles.header}>
                <h2 className={styles.title}>
                    Built for Pros.<br />
                    <span className={styles.highlight}> Designed for Everyone.</span>
                </h2>
                <p className={styles.subtitle}>
                    With <span className={styles.accent}>Jupiter Pro</span>, track trending tokens and new memecoins—
                    complete with charts, price data, and full trade history.
                </p>
            </div>

            <div className={styles.grid}>
                {/* 1. Trending tokens */}
                <div className={`${styles.card} ${styles.tokensCard}`}>
                    <div className={styles.cardTitle}>
                        <span className={`${styles.tokenContentFirst} ${styles.tokenContentHedText}`}>
                            Token
                        </span>
                        <span className={`${styles.tokenContentSecond} ${styles.tokenContentHedText}`}>
                            MC/∆%
                        </span>
                        <span className={`${styles.tokenContentThird} ${styles.tokenContentHedText}`}>
                            Vol/Net
                        </span>
                    </div>
                    <ul className={styles.tokenList}>
                        {[1,1,1,1,1,1].map((_, i) => (
                            <li key={i} className={styles.tokenListItem}>
                            <span className={`${styles.tokenContentFirst} ${styles.tokenListItemFirstBlock}`}>
                                    <span className={styles.startImage}>
                                        <StartSelectIcon/>
                                    </span>
                                    <Image src={first} className={`${styles.tokenListItemImage}`} alt="first image"/>
                                <span className={`${styles.tokenListItemTitleBlock}`}>
                                    <span className={`${styles.tokenListItemTitle}`}>TRUMP</span>
                                    <span className={`${styles.tokenListItemCount}`}>170d</span>
                                </span>
                            </span>
                                <span className={`${styles.tokenContentSecond} ${styles.tokenListItemSecondBlock}`}>
                                    <span className={`${styles.tokenListItemCost}`}>$1.72B</span>
                                    <span className={`${styles.tokenListItemDiscount}`}>2.79%</span>
                            </span>
                                <span className={`${styles.tokenContentThird} ${styles.tokenListItemThirdBlock}`}>
                                    <span className={`${styles.tokenListItemCost}`}>$43.3M</span>
                                    <span className={`${styles.tokenListItemDiscount}`}>$110K</span>
                            </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 2. JUP card */}
                <div className={styles.card}>
                    <div className={styles.jepContent}>
                        <JupiterIcon />
                        JUP
                    </div>
                    <div className={styles.jepButtons}>

                    </div>
                </div>

                {/* 3. SOL card */}
                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>SOL</h3>
                    <p className={styles.price}>$1.001</p>
                    <p className={styles.change}>+0.01%</p>
                    <div className={styles.chartPlaceholder}>
                        Chart placeholder
                    </div>
                </div>

                {/* 4. Recent Activity (зверху) */}
                <div className={`${styles.card} ${styles.activityCard}`}>
                    <h3 className={styles.cardTitle}>Recent Activity</h3>
                    <ul className={styles.activityList}>
                        <li>Swap — +14.71 USDC</li>
                        <li>Limit Order — +14.71 USDC</li>
                    </ul>
                </div>

                {/* 5. Holdings (внизу) */}
                <div className={`${styles.card} ${styles.holdingsCard}`}>
                    <h3 className={styles.cardTitle}>Your Holdings</h3>
                    <div className={styles.holdingsInfo}>
                        <div>
                            <p>Balance</p>
                            <b>1423 JUP</b>
                        </div>
                        <div>
                            <p>Value</p>
                            <b>$1502.54</b>
                        </div>
                        <div>
                            <p>Realised PnL</p>
                            <span className={styles.positive}>+0.01</span>
                        </div>
                        <div>
                            <p>Unrealised PnL</p>
                            <span className={styles.positive}>+1.12</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
