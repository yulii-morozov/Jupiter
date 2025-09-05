export enum SectionType {
    HERO = 'hero',
    TRADING = 'trading',
    LOWER_FEES = 'lower_fees',
    PRO = 'pro'
}

export interface SectionTransitionEvent {
    activeSection: SectionType;
    isOpen: boolean;
    scrollDirection: 'up' | 'down';
    transitionType: 'opening' | 'closing';
}