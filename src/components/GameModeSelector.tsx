// src/components/GameModeSelector.tsx

import React from 'react';
import { Button } from "@/components/ui/button";

interface GameModeSelectorProps {
    onSelectMode: (mode: 'quick' | 'full') => void;
}

export const GameModeSelector: React.FC<GameModeSelectorProps> = ({ onSelectMode }) => {
    return (
        <div className="flex flex-col items-center gap-4 mt-8">
            <h2 className="text-2xl font-bold">Select Game Mode</h2>
            <div className="flex gap-4">
                <Button
                    onClick={() => onSelectMode('quick')}
                    className="bg-brutal-pink text-white border-4 border-brutal-black font-bold 
            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 
            hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                    Quick Play
                </Button>
                <Button
                    onClick={() => onSelectMode('full')}
                    className="bg-brutal-yellow text-black border-4 border-brutal-black font-bold 
            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 
            hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                    Full Game
                </Button>
            </div>
        </div>
    );
};
