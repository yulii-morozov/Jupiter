'use client';

import React from 'react';
import styles from './Footer.module.css';
import { JupiterIcon } from "@/icons/JupiterIcon";

export const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                {/* Ліва частина */}
                <div className={styles.brand}>
                    <div className={styles.logoRow}>
                        <JupiterIcon width={32} height={32} />
                        <h2 className={styles.title}>Jupiter Mobile</h2>
                    </div>
                    <p className={styles.description}>
                        Building the best decentralized trading platform & largest DAO in crypto.
                    </p>
                </div>

                {/* Права частина — лінки */}
                <div className={styles.links}>
                    <div className={styles.linkGroup}>
                        <h4 className={styles.groupTitle}>Spot</h4>
                        <a href="#">Swap</a>
                        <a href="#">Limit Order</a>
                        <a href="#">DCA</a>
                        <a href="#">VA</a>
                    </div>

                    <div className={styles.linkGroup}>
                        <h4 className={styles.groupTitle}>Perps</h4>
                        <a href="#">Trade</a>
                        <a href="#">JLP</a>
                        <h4 className={styles.groupTitle}>More</h4>
                        <a href="#">Bridge</a>
                    </div>

                    <div className={styles.linkGroup}>
                        <h4 className={styles.groupTitle}>Quick Start</h4>
                        <a href="#">LFG Launchpad</a>
                        <a href="#">Jup Research</a>
                        <a href="#">Governance</a>
                    </div>

                    <div className={styles.linkGroup}>
                        <h4 className={styles.groupTitle}>Resources</h4>
                        <a href="#">Docs</a>
                        <a href="#">Guides</a>
                        <a href="#">Blog</a>
                    </div>
                </div>
            </div>

            {/* Нижній ряд */}
            <div className={styles.bottomRow}>
                <p className={styles.copy}>
                    © 2025 Jupiter Exchange All Rights Reserved
                </p>
                <div className={styles.terms}>
                    <a href="#">Terms & Conditions</a>
                </div>
            </div>
        </footer>
    );
};
