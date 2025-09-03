// src/hooks/useLocalScroll.ts

'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface ScrollEvent {
  type: 'local_animation' | 'next_section' | 'prev_section';
  animationStep?: number;
}

interface UseLocalScrollProps {
  scrollEvents: ScrollEvent[];
  onScrollEvent: (event: ScrollEvent) => void;
  onScrollUpFromTop?: () => void;
  disabled?: boolean;
  resetTrigger?: any;
  containerRef?: React.RefObject<HTMLElement>;
  requiresScrollToEnd?: boolean;
}

const SCROLL_DEBOUNCE_MS = 300;

export const useLocalScroll = ({
                                 scrollEvents,
                                 onScrollEvent,
                                 onScrollUpFromTop,
                                 disabled = false,
                                 resetTrigger,
                                 containerRef,
                                 requiresScrollToEnd = false,
                               }: UseLocalScrollProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const lastScrollTime = useRef(0);

  useEffect(() => {
    setCurrentStep(0);
  }, [resetTrigger]);

  const isAtScrollBoundary = useCallback((direction: 'up' | 'down') => {
    if (!requiresScrollToEnd || !containerRef?.current) return true;

    const element = containerRef.current;
    const { scrollTop, scrollHeight, clientHeight } = element;

    if (direction === 'up') {
      return scrollTop === 0;
    } else {
      return Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    }
  }, [requiresScrollToEnd, containerRef]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (disabled) return;

      const now = Date.now();
      if (now - lastScrollTime.current < SCROLL_DEBOUNCE_MS) {
        return;
      }

      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      if (isScrollingDown) {
        if (currentStep >= scrollEvents.length && isAtScrollBoundary('down')) {
          onScrollEvent({ type: 'next_section' });
          lastScrollTime.current = now;
          return;
        }

        if (currentStep < scrollEvents.length) {
          const nextEvent = scrollEvents[currentStep];
          onScrollEvent(nextEvent);
          setCurrentStep(currentStep + 1);
          lastScrollTime.current = now;
        }
      } else if (isScrollingUp) {
        if (currentStep === 0 && isAtScrollBoundary('up')) {
          if (onScrollUpFromTop) {
            onScrollUpFromTop();
            lastScrollTime.current = now;
          }
          return;
        }

        if (currentStep > 0) {
          const prevStep = currentStep - 1;
          setCurrentStep(prevStep);
          onScrollEvent({ type: 'local_animation', animationStep: prevStep });
          lastScrollTime.current = now;
        }
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [disabled, currentStep, scrollEvents, onScrollEvent, onScrollUpFromTop, isAtScrollBoundary]);

  return { currentStep };
};