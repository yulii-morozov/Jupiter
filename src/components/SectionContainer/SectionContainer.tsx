// src/components/SectionContainer/SectionContainer.tsx

'use client';

import React from 'react';
import { SectionTransitionEvent } from '@/types/sections'; // Use SectionTransitionEvent from types
import styles from './SectionContainer.module.css'; // Create this CSS module

interface SectionContainerProps {
    children: React.ReactNode;
    isActive: boolean;
    isTransitioning: boolean;
    transitionData: SectionTransitionEvent;
    transitionSpeed?: number;
}


export const SectionContainer: React.FC<SectionContainerProps> = ({
    children,
    isActive,
}) => {




    return (
        <div
            className={`${styles.section} ${isActive ? styles.sectionActive : ''}`}
        >
            {children}
        </div>
    );
};