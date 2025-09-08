// src/hooks/useSectionManager.ts

'use client';

import { useState, useCallback } from 'react';
import { SectionType } from '@/types/sections';

const SECTIONS_ORDER = [SectionType.HERO, SectionType.TRADING, SectionType.LOWER_FEES, SectionType.PRO, SectionType.FASTEST, SectionType.PORTFOLIO, SectionType.UNIVERSAL, SectionType.MAGIC, SectionType.RADAR, SectionType.FOOTER];
const TRANSITION_DURATION = 800;

export interface SectionAnimationEvent {
  type: 'section_opening' | 'section_closing';
  scrollDirection: 'up' | 'down';
  fromSection?: SectionType;
  toSection?: SectionType;
}

export const useSectionManager = () => {
  const [activeSection, setActiveSection] = useState<SectionType>(SECTIONS_ORDER[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousSection, setPreviousSection] = useState<SectionType | null>(null);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');

  const activeIndex = SECTIONS_ORDER.indexOf(activeSection);

  const canGoPrev = useCallback(() => activeIndex > 0, [activeIndex]);
  const canGoNext = useCallback(() => activeIndex < SECTIONS_ORDER.length - 1, [activeIndex]);

  const goToSection = useCallback((sectionIndex: number, direction: 'up' | 'down') => {
    if (isTransitioning || sectionIndex < 0 || sectionIndex >= SECTIONS_ORDER.length) {
      return;
    }

    const newSection = SECTIONS_ORDER[sectionIndex];
    if (newSection === activeSection) return;

    setIsTransitioning(true);
    setScrollDirection(direction);
    setPreviousSection(activeSection);
    setActiveSection(newSection);

    setTimeout(() => {
      setIsTransitioning(false);
      setPreviousSection(null);
    }, TRANSITION_DURATION);
  }, [isTransitioning, activeSection]);

  const goToNextSection = useCallback(() => {
    if (canGoNext()) {
      goToSection(activeIndex + 1, 'down');
    }
  }, [activeIndex, canGoNext, goToSection]);

  const goToPrevSection = useCallback(() => {
    if (canGoPrev()) {
      goToSection(activeIndex - 1, 'up');
    }
  }, [activeIndex, canGoPrev, goToSection]);

  const isSectionVisible = useCallback((section: SectionType): boolean => {
    if (!isTransitioning) {
      return section === activeSection;
    }
    return section === activeSection || section === previousSection;
  }, [activeSection, isTransitioning, previousSection]);

  const getSectionAnimationEvent = useCallback((section: SectionType): SectionAnimationEvent => {
    if (!isTransitioning) {
      return { type: 'section_opening', scrollDirection: 'down', toSection: section };
    }

    const isNewSection = section === activeSection;
    const isOldSection = section === previousSection;

    if (isNewSection) {
      return {
        type: 'section_opening',
        scrollDirection,
        fromSection: previousSection || undefined,
        toSection: section
      };
    } else if (isOldSection) {
      return {
        type: 'section_closing',
        scrollDirection,
        fromSection: section,
        toSection: activeSection
      };
    }

    return { type: 'section_closing', scrollDirection, toSection: activeSection };
  }, [activeSection, previousSection, isTransitioning, scrollDirection]);

  return {
    activeSection,
    isTransitioning,
    previousSection,
    goToNextSection,
    goToPrevSection,
    canGoNext,
    canGoPrev,
    getSectionAnimationEvent,
    isSectionVisible,
  };
};