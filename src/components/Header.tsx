import {AppleWhiteIcon} from "@/icons/AppleWhiteIcon";
import {JupiterIcon} from "@/icons/JupiterIcon";
import {GoogleIcon} from "@/icons/GoogleIcon";
import {ArrowIcon} from "@/icons/ArrowIcon";

export default function Header() {
    return (
        <header className="flex justify-between items-center px-6 py-4 absolute top-0 w-full z-10">
            <div className="text-lg font-bold flex items-center gap-1.5">
                <JupiterIcon />
                Jupiter Mobile
            </div>
            <nav className="flex gap-4">
                <a href="#" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg flex justify-center items-center gap-2 min-w-[150px]">
                    <JupiterIcon />
                    Launch Jupiter
                    <ArrowIcon />
                </a>
                <a href="#" className="bg-transparent border border-solid border-[rgba(255,255,255,0.48)] hover:bg-white/20 px-4 py-2 rounded-lg flex items-center justify-center gap-2 min-w-[150px]">
                    <AppleWhiteIcon />
                    <div className="flex flex-col leading-none">
                        <span className="text-xs text-gray-400 mr-6">Get it on</span>
                        <span>App Store</span>
                    </div>
                </a>
                <a href="#" className="bg-transparent border border-solid border-[rgba(255,255,255,0.48)] hover:bg-white/20 px-4 py-2 rounded-lg flex items-center justify-center gap-2 min-w-[150px]">
                    <GoogleIcon />
                    <div className="flex flex-col leading-none">
                        <span className="text-xs text-gray-400 mr-4">Download on</span>
                        <span>Google Play</span>
                    </div>
                </a>
            </nav>
        </header>
    );
}