'use client';

import React, {useEffect, useState} from 'react';
import { useSectionManager } from '@/hooks/useSectionManager';
import { HeroSection } from '@/sections/Hero/HeroSection';
import { TradingSection } from '@/sections/Trading/TradingSection';
import { LowerFeesSection } from '@/sections/Fees/LowerFeesSection';
import { SectionType } from '@/types/sections';
import styles from './App.module.css';
import {ProSection} from "@/sections/Pro/ProSection";
import {Footer} from "@/components/Footer/Footer";
import {FastestSection} from "@/sections/Fastest/FastestSection";
import {UniversalSendSection} from "@/sections/UniversalSend/UniversalSendSection";
import {MagicScanSection} from "@/sections/MagicScan/MagicScanSection";
import {RadarSection} from "@/sections/Radar/RadarSection";
import {PortfolioSection} from "@/sections/Portfolio/PortfolioSection";

export default function App() {
    const {
        activeSection,
        isTransitioning,
        goToNextSection,
        goToPrevSection,
        getSectionAnimationEvent,
        isSectionVisible,
    } = useSectionManager();

    const [showFooter, setShowFooter] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Перевіряємо, чи доскролили до кінця сторінки
            const reachedBottom =
                window.innerHeight + window.scrollY >= document.body.scrollHeight - 10;
            setShowFooter(reachedBottom);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={styles.container}>
            {isSectionVisible(SectionType.HERO) && (
                <div className={styles.section}>
                    <HeroSection
                        isActive={activeSection === SectionType.HERO}
                        isTransitioning={isTransitioning}
                        onRequestPrevSection={goToPrevSection}
                        onRequestNextSection={goToNextSection}
                        animationEvent={getSectionAnimationEvent(SectionType.HERO)}
                    />
                </div>
            )}

            {isSectionVisible(SectionType.TRADING) && (
                <div className={styles.section}>
                    <TradingSection
                        isActive={activeSection === SectionType.TRADING}
                        isTransitioning={isTransitioning}
                        onRequestPrevSection={goToPrevSection}
                        onRequestNextSection={goToNextSection}
                        animationEvent={getSectionAnimationEvent(SectionType.TRADING)}
                    />
                </div>
            )}

            {isSectionVisible(SectionType.LOWER_FEES) && (
                <div className={styles.section}>
                    <LowerFeesSection
                        isActive={activeSection === SectionType.LOWER_FEES}
                        isTransitioning={isTransitioning}
                        onRequestPrevSection={goToPrevSection}
                        onRequestNextSection={goToNextSection}
                        animationEvent={getSectionAnimationEvent(SectionType.LOWER_FEES)}
                    />
                </div>
            )}

            {isSectionVisible(SectionType.PRO) && (
                <div className={styles.section}>
                    <ProSection
                        isActive={activeSection === SectionType.PRO}
                        isTransitioning={isTransitioning}
                        onRequestPrevSection={goToPrevSection}
                        onRequestNextSection={goToNextSection}
                        animationEvent={getSectionAnimationEvent(SectionType.PRO)}
                    />
                </div>
            )}

            {isSectionVisible(SectionType.FASTEST) && (
                <div className={styles.section}>
                    <FastestSection
                        isActive={activeSection === SectionType.FASTEST}
                        isTransitioning={isTransitioning}
                        onRequestPrevSection={goToPrevSection}
                        onRequestNextSection={goToNextSection}
                        animationEvent={getSectionAnimationEvent(SectionType.FASTEST)}
                    />
                </div>
            )}

            {isSectionVisible(SectionType.PORTFOLIO) && (
                <div className={styles.section}>
                    <PortfolioSection
                        isActive={activeSection === SectionType.PORTFOLIO}
                        isTransitioning={isTransitioning}
                        onRequestPrevSection={goToPrevSection}
                        onRequestNextSection={goToNextSection}
                        animationEvent={getSectionAnimationEvent(SectionType.PORTFOLIO)}
                    />
                </div>
            )}

            {isSectionVisible(SectionType.UNIVERSAL) && (
                <div className={styles.section}>
                    <UniversalSendSection
                        isActive={activeSection === SectionType.UNIVERSAL}
                        isTransitioning={isTransitioning}
                        onRequestPrevSection={goToPrevSection}
                        onRequestNextSection={goToNextSection}
                        animationEvent={getSectionAnimationEvent(SectionType.UNIVERSAL)}
                    />
                </div>
            )}

            {isSectionVisible(SectionType.MAGIC) && (
                <div className={styles.section}>
                    <MagicScanSection
                        isActive={activeSection === SectionType.MAGIC}
                        isTransitioning={isTransitioning}
                        onRequestPrevSection={goToPrevSection}
                        onRequestNextSection={goToNextSection}
                        animationEvent={getSectionAnimationEvent(SectionType.MAGIC)}
                    />
                </div>
            )}

            {isSectionVisible(SectionType.RADAR) && (
                <div className={styles.section}>
                    <RadarSection
                        isActive={activeSection === SectionType.RADAR}
                        isTransitioning={isTransitioning}
                        onRequestPrevSection={goToPrevSection}
                        onRequestNextSection={goToNextSection}
                        animationEvent={getSectionAnimationEvent(SectionType.RADAR)}
                    />
                    <Footer />
                </div>
            )}
        </div>
    );
}
