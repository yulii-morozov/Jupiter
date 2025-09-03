export enum SectionType {
    HERO = 'hero',
    TRADING = 'trading',
    LOWER_FEES = 'lower_fees',
    // Add more sections here as needed
}

export interface SectionTransitionEvent {
    activeSection: SectionType;
    isOpen: boolean; // True if the section is meant to be visible/open
    scrollDirection: 'up' | 'down';
    transitionType: 'opening' | 'closing'; // Indicates if this section is currently opening or closing
}