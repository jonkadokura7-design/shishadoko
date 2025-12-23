import { motion } from 'framer-motion';

export function LoadingSmoke() {
    return (
        <div className="flex flex-col items-center justify-center h-64 w-full">
            <div className="relative">
                {/* Smoke particles */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bottom-0 left-1/2 w-12 h-12 bg-gray-500/30 rounded-full blur-xl"
                        initial={{ opacity: 0, scale: 0.5, y: 0, x: '-50%' }}
                        animate={{
                            opacity: [0, 0.4, 0],
                            scale: [0.5, 1.5, 2],
                            y: -100,
                            x: ['-50%', Math.random() > 0.5 ? '-20%' : '-80%']
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.8,
                            ease: "easeInOut"
                        }}
                    />
                ))}

                {/* Base */}
                <div className="w-8 h-12 border-2 border-amber-500/50 rounded-b-xl relative z-10 bg-slate-900/50 backdrop-blur-sm">
                    <div className="absolute bottom-0 w-full h-1/2 bg-amber-500/20 rounded-b-lg animate-pulse" />
                </div>
                <div className="w-1 h-16 bg-gray-600 mx-auto -mt-1 relative z-0" />
            </div>
            <p className="mt-8 text-amber-200/80 font-light tracking-widest text-sm animate-pulse">
                SEARCHING...
            </p>
        </div>
    );
}
