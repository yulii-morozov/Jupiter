import styles from "./HeroSection.module.css";
import { JupiterIcon } from "@/icons/JupiterIcon";
import { AppleBlackIcon } from "@/icons/AppleBlackIcon";
import { GoogleIcon } from "@/icons/GoogleIcon";

export default function HeroSection() {
    return (
        <section className={styles.hero}>
            <p className={styles.subtitle}>
                <JupiterIcon />
                Jupiter Mobile
            </p>
            <h1 className={styles.title}>The DeFi Superapp</h1>
            <p className={styles.description}>
                The 10x better trading, portfolio, and wallet app from Solana's top DeFi platform.
            </p>
            <div className={styles.buttons}>
                <button className={styles.storeBtn}>
                    <AppleBlackIcon />
                    <div className={styles.storeText}>
                        <span className={styles.smallText}>Get it on</span>
                        <span>App Store</span>
                    </div>
                </button>
                <button className={styles.storeBtn}>
                    <GoogleIcon />
                    <div className={styles.storeText}>
                        <span className={styles.small}>Download on</span>
                        <span>Google Play</span>
                    </div>
                </button>
            </div>
        </section>
    );
}
