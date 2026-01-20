import React, { useState } from 'react';
import { Search, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnalyzerProps {
    onAnalyze: (text: string) => Promise<void>;
    isAnalyzing: boolean;
    error: string | null;
}

export const Analyzer: React.FC<AnalyzerProps> = ({ onAnalyze, isAnalyzing, error }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim().length >= 10) {
            onAnalyze(text);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="relative z-10 group">
                <div className="glass-panel rounded-2xl p-1 transition-all duration-300 group-hover:shadow-[0_0_40px_rgba(6,182,212,0.15)]">
                    <div className="relative bg-zinc-950/80 rounded-xl overflow-hidden">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Paste text, news article, or social media post to analyze credibility..."
                            className="w-full h-40 bg-transparent text-zinc-100 p-6 placeholder:text-zinc-600 focus:outline-none resize-none text-lg leading-relaxed font-light scrollbar-hide"
                            disabled={isAnalyzing}
                        />

                        <div className="flex items-center justify-between px-4 py-3 bg-zinc-950 border-t border-zinc-800/50">
                            <span className={`text-xs font-medium transition-colors ${text.length < 10 ? 'text-zinc-600' : 'text-zinc-400'}`}>
                                {text.length} characters
                            </span>

                            <button
                                type="submit"
                                disabled={text.length < 10 || isAnalyzing}
                                className={`
                            relative overflow-hidden flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all duration-300
                            ${text.length < 10 || isAnalyzing
                                        ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                                        : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-900/20 hover:shadow-cyan-500/20'}
                        `}
                            >
                                {isAnalyzing ? (
                                    <>
                                        <Sparkles className="w-4 h-4 animate-spin" />
                                        <span>Analyzing...</span>
                                    </>
                                ) : (
                                    <>
                                        <Search className="w-4 h-4" />
                                        <span>Analyze Credibility</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-4 p-4 rounded-lg bg-red-950/30 border border-red-500/20 text-red-200 flex items-center gap-3"
                    >
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <p className="text-sm">{error}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
