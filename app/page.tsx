'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { Sparkles, MapPin } from 'lucide-react';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 text-center relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-[-1]">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gold-900/10 rounded-full blur-[100px]" />
            </div>

            <div className="z-10 flex flex-col items-center gap-8 max-w-lg w-full">
                {/* Title / Logo */}
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600 drop-shadow-lg pb-2">
                        シーシャどこ？
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground font-medium tracking-wide">
                        Find the best Shisha spots nearby.
                    </p>
                </div>

                {/* Action Button */}
                <Link href="/search" className="w-full sm:w-auto">
                    <button className="group relative inline-flex h-12 w-full sm:w-64 items-center justify-center overflow-hidden rounded-full bg-primary px-6 font-medium text-neutral-950 transition-all duration-300 hover:w-full hover:scale-105 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 glow-btn">
                        <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                            <div className="relative h-full w-8 bg-white/20" />
                        </div>
                        <MapPin className="mr-2 h-5 w-5" />
                        <span className="tracking-wider">探す (Search)</span>
                    </button>
                </Link>

                <div className="flex gap-4 text-sm text-muted-foreground mt-8">
                    <div className="flex items-center gap-1">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span>High Ratings Only</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span>Nearby</span>
                    </div>
                </div>
            </div>
        </main>
    );
}
