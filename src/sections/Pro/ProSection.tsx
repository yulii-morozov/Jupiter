'use client';

import React from 'react';
import { SectionAnimationEvent } from '@/hooks/useSectionManager';
import styles from './ProSection.module.css';
import { ScrollEvent, useLocalScroll } from '@/hooks/useLocalScroll';
import TRUMP from "@/assets/Tokens/TRUMP.png";
import JUP from "@/assets/Tokens/JUP.png";
import SOL from "@/assets/Tokens/SOL.png";
import S from "@/assets/Tokens/S.png"
import Image from "next/image";
import {StartSelectImage} from "@/icons/StarSelectImage";
import {CheckIcon} from "@/icons/CheckIcon";
import {ProgressIcon} from "@/icons/ProgressIcon";
import {DotsIcon} from "@/icons/DotsIcon";
import {EkoIcon} from "@/icons/EkoIcon";
import {MiniArrowDownIcon} from "@/icons/MiniArrowDownIcon";

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
                                        <StartSelectImage  />
                                    </span>
                                    <Image src={TRUMP} className={`${styles.tokenListItemImage}`} alt="first image"/>
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

                <div className={styles.card}>
                    <span className={styles.jepOpenLine}/>
                    <div className={styles.jepContent}>
                        <StartSelectImage width={22} height={22} />
                        <Image src={JUP} className={`${styles.jepImage}`} alt="second image" />
                        <div className={styles.jepTitleBlock}>
                            <div className={`${styles.jepTitles}`}>
                                <p className={`${styles.jepTitle}`}>JEP <CheckIcon /></p>
                                <p className={`${styles.jepCount}`}>322d</p>
                            </div>
                            <div className={styles.jepCosts}>
                                <p className={`${styles.jepCost}`}>$1.001</p>
                                <p className={`${styles.jepProgres}`}><ProgressIcon /> 3.1%</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.jepButtonsContainer}>
                        <div className={styles.jepButtons}>
                            <button className={`${styles.jepButton} ${styles.jepButtonActive}`}>
                                <span className={`${styles.jepButtonActiveText}`}>
                                    Pro
                                </span>
                            </button>
                            <button className={`${styles.jepButton}`}>Live Feed</button>
                            <button className={`${styles.jepButton}`}>Content</button>
                        </div>
                        <div className={`${styles.jepButtonOptions} ${styles.jepButtonActive}`}>
                            <span className={`${styles.jepButtonActiveText}`}>
                                <DotsIcon />
                            </span>
                        </div>
                    </div>
                </div>

                <div className={styles.card}>
                    <div className={styles.jepContent}>
                        <Image src={SOL} className={`${styles.jepImage}`} alt="second image" />
                        <div className={styles.jepTitleBlock}>
                            <div className={`${styles.jepTitles}`}>
                                <p className={`${styles.jepTitle}`}>SOL <CheckIcon stroke={"#1FFFE9"} /></p>
                                <p className={`${styles.jepCount}`}>Solana Coin</p>
                            </div>
                            <div className={styles.solEkoBlock}>
                                <div className={`${styles.solEko}`}>
                                    <div className={`${styles.solEkoIcon}`}>
                                        <EkoIcon />
                                    </div>
                                    <div className={`${styles.solEkoCount}`}>100</div>
                                </div>
                                <div className={`${styles.jepButtonOptions} ${styles.jepButtonActive}`}>
                                    <span className={`${styles.jepButtonActiveText}`}>
                                        <DotsIcon />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.chartPlaceholder}>
                        Chart placeholder
                    </div>
                </div>

                {/* 4. Recent Activity */}
                <div className={`${styles.card} ${styles.activityCard}`}>
                    <ul className={styles.activityList}>
                        <li className={styles.activityItem}>
                            <div className={styles.activityLeft}>
                                <Image src={S} alt="swap" className={styles.activityTokenIcon}/>
                                <div className={styles.activityTextBlock}>
                                    <p className={styles.activityTitle}>Swap</p>
                                    <p className={styles.activityDate}>December 4, 2024</p>
                                </div>
                            </div>
                            <div className={styles.activityRight}>
                                <p className={styles.activityPositive}>+14.7123239 USDC</p>
                                <p className={styles.activityNegative}>-0.05 SOL</p>
                            </div>
                        </li>

                        <li className={styles.activityItem}>
                            <div className={styles.activityLeft}>
                                <Image src={S} alt="limit order" className={styles.activityTokenIcon}/>
                                <div className={styles.activityTextBlock}>
                                    <p className={styles.activityTitle}>Limit Order</p>
                                    <p className={styles.activityDate}>December 4, 2024</p>
                                </div>
                            </div>
                            <div className={styles.activityRight}>
                                <p className={styles.activityPositive}>+14.7123239 USDC</p>
                                <p className={styles.activityNegative}>-0.05 SOL</p>
                            </div>
                        </li>
                    </ul>
                    <div className={styles.activityFooter}>
                        <a href="#" className={styles.viewAll}>View all</a>
                        <MiniArrowDownIcon/>
                    </div>
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
