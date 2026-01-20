import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen w-full relative overflow-hidden bg-grid-zinc-900/50">
            {/* Background Gradient Orbs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-cyan-900/20 rounded-full blur-[128px]" />
                <div className="absolute top-[40%] right-[0%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[128px]" />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8 max-w-5xl">
                {children}
            </div>
        </div>
    );
};
