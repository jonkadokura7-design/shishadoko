import type { Metadata } from 'next';
import { Inter, Noto_Sans_JP } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const notojp = Noto_Sans_JP({ subsets: ['latin'], variable: '--font-noto' });

export const metadata: Metadata = {
    title: 'シーシャどこ？ | Nearby Shisha Finder',
    description: '現在地周辺の評価の高いシーシャ屋を検索・提案するWebアプリ',
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ja" className="dark">
            <body className={`${inter.variable} ${notojp.variable} font-sans min-h-screen antialiased`}>
                {children}
            </body>
        </html>
    );
}
