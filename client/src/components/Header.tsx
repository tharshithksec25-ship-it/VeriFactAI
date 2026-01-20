import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
    return (
        <header className="flex items-center justify-between py-6 mb-12">
            <div className="flex items-center gap-3">
                <div className="p-2 border border-cyan-500/30 bg-cyan-950/30 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                    <ShieldCheck className="w-8 h-8 text-cyan-400" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">
                        VeriFact <span className="text-cyan-400">Secure AI</span>
                    </h1>
                    <p className="text-xs text-zinc-400 tracking-wider uppercase font-medium">Credibility Analysis System</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Status Indicator */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/50 border border-zinc-800 text-xs font-medium text-emerald-400">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    SYSTEM ACTIVE
                </div>
            </div>
        </header>
    );
};
