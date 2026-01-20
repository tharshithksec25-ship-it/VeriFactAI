import React from 'react';
import { type AnalysisResult } from '../types';
import { AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ResultCardProps {
    result: AnalysisResult;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
    const { credibility_score, credibility_level, risk_indicators } = result;

    const getScoreColor = (score: number) => {
        if (score >= 80) return { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', gradient: 'from-emerald-500/20' };
        if (score >= 50) return { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', gradient: 'from-amber-500/20' };
        return { text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30', gradient: 'from-rose-500/20' };
    };

    const colors = getScoreColor(credibility_score);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-3xl mx-auto mt-12"
        >
            <div className={cn("glass-panel rounded-2xl overflow-hidden border p-1", colors.border)}>
                <div className="bg-zinc-950/90 rounded-xl overflow-hidden relative">

                    {/* Top Banner with Score */}
                    <div className={cn("absolute top-0 left-0 w-full h-1 bg-gradient-to-r via-transparent to-transparent", colors.gradient.replace('from-', 'via-'))} />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
                        {/* Left: Score */}
                        <div className="md:col-span-1 flex flex-col items-center justify-center p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                            <div className="relative w-32 h-32 flex items-center justify-center">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                    <path
                                        className="text-zinc-800"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                    />
                                    <motion.path
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: credibility_score / 100 }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className={cn(colors.text)}
                                        strokeDasharray="100, 100"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute flex flex-col items-center">
                                    <span className={cn("text-4xl font-bold", colors.text)}>{credibility_score}</span>
                                    <span className="text-xs text-zinc-500 font-medium">SCORE</span>
                                </div>
                            </div>
                            <div className={cn("mt-4 px-3 py-1 rounded-full text-sm font-semibold border", colors.bg, colors.text, colors.border)}>
                                {credibility_level.toUpperCase()}
                            </div>
                        </div>

                        {/* Right: Summary & Risks */}
                        <div className="md:col-span-2 space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-2">
                                    <FileText className="w-5 h-5 text-cyan-500" />
                                    Analysis Summary
                                </h3>
                                <p className="text-zinc-400 leading-relaxed text-sm">
                                    {result.analysis_summary}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-3">
                                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                                    Risk Indicators
                                </h3>
                                <div className="space-y-2">
                                    {risk_indicators.length > 0 ? (
                                        risk_indicators.map((risk, idx) => (
                                            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/50 border border-zinc-800/50">
                                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                                                <span className="text-sm text-zinc-300">{risk}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-950/30 border border-emerald-900/50 text-emerald-400 text-sm">
                                            <CheckCircle2 className="w-4 h-4" />
                                            No significant risks identified.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-950 p-4 border-t border-zinc-900 text-center">
                        <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-medium">
                            {result.responsible_ai_notice}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
