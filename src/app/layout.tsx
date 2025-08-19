import "@/styles/globals.css";
import Header from "@/components/Header";

export const metadata = {
    title: "Jupiter Landing",
    description: "The DeFi Superapp Landing Page",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className="bg-black text-white">
        <Header />
        {children}
        </body>
        </html>
    );
}
