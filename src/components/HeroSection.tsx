import { JupiterIcon } from "@/icons/JupiterIcon";
import { AppleBlackIcon } from "@/icons/AppleBlackIcon";
import { GoogleIcon } from "@/icons/GoogleIcon";

export default function HeroSection() {
    return (
        <section className="relative flex flex-col justify-center items-center text-center h-screen px-6 z-10">
            <p className="uppercase tracking-wide text-sm mb-4 relative z-10 flex items-center gap-1.5">
                <JupiterIcon />
                Jupiter Mobile
            </p>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 relative z-10">The DeFi Superapp</h1>
            <p className="text-gray-300 mb-6 max-w-xl relative z-10">
                The 10x better trading, portfolio, and wallet app from Solana's top DeFi platform.
            </p>
            <div className="flex gap-4 relative z-10">
                <button className="bg-white text-black px-4 py-2 rounded-lg flex items-center justify-center gap-2 min-w-[150px]">
                    <AppleBlackIcon />
                    <div className="flex flex-col leading-none">
                        <span className="text-xs text-gray-400 mr-6">Get it on</span>
                        <span>App Store</span>
                    </div>
                </button>
                <button className="bg-white text-black px-4 py-2 rounded-lg flex items-center justify-center gap-2 min-w-[150px]">
                    <GoogleIcon />
                    <div className="flex flex-col leading-none">
                        <span className="text-xs text-gray-400 mr-4">Download on</span>
                        <span>Google Play</span>
                    </div>
                </button>
            </div>
        </section>
    );
}