"use client";
import { useState } from "react";
import styles from "./Header.module.css";
import { JupiterIcon } from "@/icons/JupiterIcon";
import { AppleWhiteIcon } from "@/icons/AppleWhiteIcon";
import { GoogleIcon } from "@/icons/GoogleIcon";
import { ArrowIcon } from "@/icons/ArrowIcon";
import { MenuIcon } from "@/icons/MenuIcon";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <JupiterIcon />
                Jupiter Mobile
            </div>

            <button
                className={styles.menuToggle}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
            >
                <MenuIcon />
            </button>

            <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ""}`}>
                <a href="#" className={styles.launchBtn}>
                    <JupiterIcon />
                    Launch Jupiter
                    <ArrowIcon />
                </a>
                <a href="#" className={styles.storeBtn}>
                    <AppleWhiteIcon />
                    <div className={styles.storeText}>
                        <span className={styles.small}>Get it on</span>
                        <span>App Store</span>
                    </div>
                </a>
                <a href="#" className={styles.storeBtn}>
                    <GoogleIcon />
                    <div className={styles.storeText}>
                        <span className={styles.small}>Download on</span>
                        <span>Google Play</span>
                    </div>
                </a>
            </nav>
        </header>
    );
}
