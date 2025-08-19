import {AppleWhiteIcon} from "@/icons/AppleWhiteIcon";
import {JupiterIcon} from "@/icons/JupiterIcon";
import {GoogleIcon} from "@/icons/GoogleIcon";

export default function Header() {
    return (
        <header className="flex justify-between items-center px-6 py-4 absolute top-0 w-full z-10">
            <div className="text-lg font-bold flex items-center gap-1.5">
                <JupiterIcon />
                Jupiter Mobile
            </div>
            <nav className="flex gap-4">
                <a href="#" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg flex justify-center items-center gap-1.5">
                    <JupiterIcon />
                    Launch Jupiter
                </a>
                <a href="#" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg flex justify-center items-center gap-1.5">
                    <AppleWhiteIcon />
                    App Store
                </a>
                <a href="#" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg flex justify-center items-center gap-1.5">
                    <GoogleIcon />
                    Google Play
                </a>
            </nav>
        </header>
    );
}
