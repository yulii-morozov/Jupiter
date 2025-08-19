import {JupiterIcon} from "@/icons/JupiterIcon";
import {AppleWhiteIcon} from "@/icons/AppleWhiteIcon";
import {AppleBlackIcon} from "@/icons/AppleBlackIcon";
import {GoogleIcon} from "@/icons/GoogleIcon";

export default function HeroSection() {
    return (
        <section className="relative flex flex-col justify-center items-center text-center h-screen px-6 z-10">
            <p className="uppercase tracking-wide text-sm mb-4 relative z-10 flex  items-center gap-1.5">
                <JupiterIcon />
                Jupiter Mobile
            </p>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 relative z-10">The DeFi Superapp</h1>
            <p className="text-gray-300 mb-6 max-w-xl relative z-10">
                The 10x better trading, portfolio, and wallet app from Solana's top DeFi platform.
            </p>
            <div className="flex gap-4 relative z-10">
                <button className="bg-white text-black px-6 py-3 rounded-lg flex justify-center items-center gap-1.5">
                    <AppleBlackIcon />
                    App Store
                </button>
                <button className="bg-white text-black px-6 py-3 rounded-lg flex justify-center items-center gap-1.5">
                    <GoogleIcon />
                    Google Play
                </button>
            </div>
        </section>
    );
}
