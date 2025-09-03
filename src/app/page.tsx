'use client';

import React from 'react';
import { useSectionManager } from '@/hooks/useSectionManager';
import { HeroSection } from '@/sections/Hero/HeroSection';
import { TradingSection } from '@/sections/Trading/TradingSection';
import { LowerFeesSection } from '@/sections/Fees/LowerFeesSection';
import { SectionType } from '@/types/sections';
import styles from './App.module.css';

export default function App() {
    const {
        activeSection,
        isTransitioning,
        goToNextSection,
        goToPrevSection,
        canGoNext,
        canGoPrev,
        getSectionAnimationEvent,
        isSectionVisible,
    } = useSectionManager();

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

        </div>
    );
}
