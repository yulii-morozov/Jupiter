export enum SectionType {
    HERO = 'hero',
    TRADING = 'trading',
    LOWER_FEES = 'lower_fees',
    PRO = 'pro',
    FOOTER = 'footer',
    FASTEST = 'fastest',
    UNIVERSAL = 'universal',
    MAGIC = 'magic',
    RADAR = 'radar',
    PORTFOLIO = 'portfolio',
}

export interface SectionTransitionEvent {
    activeSection: SectionType;
    isOpen: boolean;
    scrollDirection: 'up' | 'down';
    transitionType: 'opening' | 'closing';
}