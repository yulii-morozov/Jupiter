'use client';
import { SectionAnimationEvent } from '../../hooks/useSectionManager';
import styles from './TradingSection.module.css';
import phoneImage from "@/assets/iphone14.png";
import bgImage from "@/assets/trading-section-bg.png";
import Image from "next/image";
import {ScrollEvent, useLocalScroll} from "@/hooks/useLocalScroll";
import {HistoryIcon} from "@/icons/HistoryIcon";
import {FileIcon} from "@/icons/FileIcon";
import {TokenIcon} from "@/icons/TokenIcon";
import {LightningIcon} from "@/icons/Lightning";

interface TradingSectionProps {
  isActive: boolean;
  isTransitioning: boolean;
  onRequestPrevSection: () => void;
  onRequestNextSection: () => void;
  animationEvent: SectionAnimationEvent;
}

const BG_HEIGHT_PX = 1000;

export const TradingSection: React.FC<TradingSectionProps> = ({
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
    resetTrigger: isActive && !isTransitioning
  });

  return (
      <div
          className={styles.tradingSection}
      >
        <div
            className={styles.scrollContainer} style={{ paddingBottom: `${BG_HEIGHT_PX}px` }}>
          <Image
              src={bgImage}
              alt=""
              aria-hidden
              className={styles.backgroundImage}
              style={{ height: `${BG_HEIGHT_PX}px` }}
          />
          <div className={styles.container}>
            <div className={styles.textContainer}
            >
              <p className={styles.label}>One-Tap Trading</p>
              <h2 className={styles.title}>Trade on the <b className={styles.titleHighlight}>#1 DeFi Platform</b></h2>
              <p className={styles.description}>Access tens of millions of Solana tokens with the most comprehensive coverage. Spot trade, set limit orders, DCA (dollar-cost average) into anything from SOL to memecoins.</p>
            </div>
            <div className={styles.phoneContainer}>
              <div className={styles.phoneMockup}>
                <Image
                    src={phoneImage}
                    className={styles.phoneImage}
                    alt="Phone mockup"
                />

                <div className={`${styles.iconWrapper} ${styles.topLeft}`}>
                  <div className={styles.iconBlock}>
                    <HistoryIcon />
                  </div>
                </div>
                <div className={`${styles.iconWrapper} ${styles.bottomLeft}`}>
                  <div className={styles.iconBlock}>
                    <FileIcon />
                  </div>
                </div>
                <div className={`${styles.iconWrapper} ${styles.topRight}`}>
                  <div className={styles.iconBlock}>
                    <TokenIcon />
                  </div>
                </div>
                <div className={`${styles.iconWrapper} ${styles.bottomRight}`}>
                  <div className={styles.iconBlock}>
                    <LightningIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};