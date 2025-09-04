// src/components/SectionContainer/SectionContainer.tsx

'use client';

import React from 'react';
import { motion, Variants } from 'motion/react';
import { SectionTransitionEvent } from '@/types/sections'; // Use SectionTransitionEvent from types
import styles from './SectionContainer.module.css'; // Create this CSS module

interface SectionContainerProps {
    children: React.ReactNode;
    isActive: boolean;
    isTransitioning: boolean;
    transitionData: SectionTransitionEvent;
    transitionSpeed?: number; // Make it configurable
}

const DEFAULT_TRANSITION_SPEED = 0.8; // Should match TRANSITION_DURATION in useSectionManager

export const SectionContainer: React.FC<SectionContainerProps> = ({
    children,
    isActive,
    isTransitioning,
    transitionData,
    transitionSpeed = DEFAULT_TRANSITION_SPEED,
}) => {
    // Fullpage.js style section variants for smooth slide transitions
    const sectionVariants: Variants = {
        // Initial position (visible and stable)
        enter: {
            y: 0,
            opacity: 1,
            transition: { duration: transitionSpeed, ease: "easeInOut" }
        },
        // When section is closing and scrolling DOWN, it moves UP out of view
        exitScrollDown: {
            y: '-100%',
            opacity: 1, // Keep opacity to maintain smooth slide
            transition: { duration: transitionSpeed, ease: "easeInOut" }
        },
        // When section is closing and scrolling UP, it moves DOWN out of view
        exitScrollUp: {
            y: '100%',
            opacity: 1, // Keep opacity to maintain smooth slide
            transition: { duration: transitionSpeed, ease: "easeInOut" }
        },
        // Initial state for a section entering from the TOP (when scrolling up)
        initialTop: { y: '-100%', opacity: 1 },
        // Initial state for a section entering from the BOTTOM (when scrolling down)
        initialBottom: { y: '100%', opacity: 1 },
    };

    const getSectionVariant = () => {
        const { isOpen, scrollDirection, transitionType } = transitionData;

        if (transitionType === 'closing') {
            return scrollDirection === 'down' ? 'exitScrollDown' : 'exitScrollUp';
        } else if (transitionType === 'opening' && isTransitioning) {
            // When a section is opening and we are actively transitioning
            // it should animate from the 'initial' position to 'enter'
            return 'enter';
        } else if (isOpen && !isTransitioning) {
            // Section is fully open and not transitioning
            return 'enter';
        }

        // Fallback, shouldn't typically be hit if logic is sound
        return 'enter';
    };

    const getSectionInitial = () => {
        if (!isTransitioning) {
            // If not transitioning, assume it's already in the 'enter' state
            // This prevents unwanted animations on initial load if not the first section
            return 'enter';
        }

        const { scrollDirection, transitionType } = transitionData;

        if (transitionType === 'opening') {
            // When opening, start from the opposite direction of the scroll
            return scrollDirection === 'down' ? 'initialBottom' : 'initialTop';
        }

        // For closing sections during transition, they start from 'enter'
        return 'enter';
    };

    return (
        <motion.section
            className={`${styles.section} ${isActive ? styles.sectionActive : ''}`}
            variants={sectionVariants}
            initial={getSectionInitial()}
            animate={getSectionVariant()}
            // Optionally add `exit` if you want explicit exit animations for unmounting components
            // but `useSectionManager` keeps components mounted during transition for smooth effect
        >
            {children}
        </motion.section>
    );
};