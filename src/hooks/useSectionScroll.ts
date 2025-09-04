'use client';

import { useEffect, useRef } from 'react';
import { SectionType, SectionTransitionEvent } from '@/types/sections';

interface UseSectionScrollProps {
    sectionType: SectionType;
    isActive: boolean;
    isTransitioning: boolean;
    onTransitionRequest: (event: SectionTransitionEvent) => void;
    scrollContainerRef?: React.RefObject<HTMLElement>;
    hasInternalScroll?: boolean;
}

const SCROLL_DEBOUNCE_MS = 100;

export const useSectionScroll = ({
                                     sectionType,
                                     isActive,
                                     isTransitioning,
                                     onTransitionRequest,
                                     scrollContainerRef,
                                     hasInternalScroll = false,
                                 }: UseSectionScrollProps) => {
    const lastScrollTime = useRef(0);

    useEffect(() => {
        // Block body scroll when any section is active
        if (isActive) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            if (isActive) {
                document.body.style.overflow = '';
            }
        };
    }, [isActive]);

    useEffect(() => {
        if (!isActive || isTransitioning) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault(); // Always block default scroll

            const now = Date.now();
            if (now - lastScrollTime.current < SCROLL_DEBOUNCE_MS) {
                return;
            }

            const direction = e.deltaY > 0 ? 'down' : 'up';

            // For sections with internal scroll, check boundaries
            if (hasInternalScroll && scrollContainerRef?.current) {
                const container = scrollContainerRef.current;
                const isAtTop = container.scrollTop <= 1;
                const isAtBottom = Math.ceil(container.scrollTop + container.clientHeight) >=
                    container.scrollHeight - 1;

                // If scrolling within content (not at boundaries), handle internal scroll
                if ((direction === 'down' && !isAtBottom) || (direction === 'up' && !isAtTop)) {
                    // Manually handle scroll for the container
                    const scrollAmount = direction === 'down' ? 100 : -100;
                    container.scrollBy({ top: scrollAmount, behavior: 'smooth' });
                    return;
                }
            }

            // Request section transition
            lastScrollTime.current = now;
            onTransitionRequest({
                activeSection: sectionType,
                isOpen: true,
                scrollDirection: direction,
                transitionType: direction === 'down' ? 'closing' : 'opening',
            });
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, [isActive, isTransitioning, sectionType, onTransitionRequest, hasInternalScroll, scrollContainerRef]);

    // Reset scroll position when section becomes active
    useEffect(() => {
        if (isActive && scrollContainerRef?.current) {
            scrollContainerRef.current.scrollTop = 0;
        }
    }, [isActive, scrollContainerRef]);
};