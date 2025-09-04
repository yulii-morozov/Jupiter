// src/components/LocalScrollWrapper/LocalScrollWrapper.tsx

'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useLocalScroll, ScrollEvent } from '@/hooks/useLocalScroll';

interface LocalScrollWrapperProps {
    children: (args: { localAnimationStage: number; containerRef: React.RefObject<HTMLDivElement> }) => React.ReactNode;
    isActive: boolean;
    isTransitioning: boolean;
    onRequestPrevSection: () => void;
    onRequestNextSection?: () => void; // Optional if section is last
    scrollEvents?: ScrollEvent[]; // Internal scroll events for this section
    requiresScrollToEnd?: boolean; // Does this section require scrolling to its end before next section?
    contentHeight?: number; // Explicit height for scroll content if known (e.g., TradingSection's BG_HEIGHT_PX)
    scrollDebounceMs?: number; // Pass-through for useLocalScroll
}

const DEFAULT_SCROLL_EVENTS: ScrollEvent[] = [];

export const LocalScrollWrapper: React.FC<LocalScrollWrapperProps> = ({
    children,
    isActive,
    isTransitioning,
    onRequestPrevSection,
    onRequestNextSection,
    scrollEvents = DEFAULT_SCROLL_EVENTS,
    requiresScrollToEnd = false,
    contentHeight,
    scrollDebounceMs,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [localAnimationStage, setLocalAnimationStage] = useState(0);

    const handleScrollEvent = useCallback((event: ScrollEvent) => {
        switch (event.type) {
            case 'next_section':
                onRequestNextSection?.(); // Call if provided
                break;
            case 'prev_section': // In case an event explicitly triggers prev section (less common for local)
                onRequestPrevSection();
                break;
            case 'local_animation':
                setLocalAnimationStage(event.animationStep || 0);
                break;
            default:
                // Handle unexpected event types or log
                break;
        }
    }, [onRequestNextSection, onRequestPrevSection]);

    const { currentStep } = useLocalScroll({
        scrollEvents,
        onScrollEvent: handleScrollEvent,
        onScrollUpFromTop: onRequestPrevSection,
        disabled: !isActive || isTransitioning,
        resetTrigger: isActive, // Resets local scroll when section becomes active
        containerRef: requiresScrollToEnd ? containerRef : undefined, // Only pass ref if needed
        requiresScrollToEnd,
        scrollDebounceMs,
    });

    // Keep internal state in sync with currentStep from useLocalScroll
    useEffect(() => {
        setLocalAnimationStage(currentStep);
    }, [currentStep]);

    // Ensure scroll position is reset when section becomes active
    useEffect(() => {
        if (isActive && containerRef.current) {
            containerRef.current.scrollTop = 0;
            setLocalAnimationStage(0);
        }
    }, [isActive]);


    return (
        <div
            ref={containerRef}
            className="local-scroll-container" // You might want a CSS class for this or pass styles
            style={{
                overflowY: requiresScrollToEnd ? 'scroll' : 'hidden', // Only scrollable if requiresScrollToEnd
                height: '100%', // Ensure it takes full height to be scrollable
                width: '100%',
                position: 'relative',
            }}
        >
            {/* Spacer to enable scrolling if contentHeight is provided and requiresScrollToEnd */}
            {requiresScrollToEnd && contentHeight && (
                <div style={{ height: `${contentHeight}px`, position: 'absolute', width: '100%', top: 0, left: 0 }}></div>
            )}
            {children({ localAnimationStage, containerRef: containerRef as React.RefObject<HTMLDivElement> })}
        </div>
    );
};