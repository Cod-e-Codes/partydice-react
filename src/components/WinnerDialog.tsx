// src/components/WinnerDialog.tsx

import React from 'react';
import { Button } from "@/components/ui/button";

interface WinnerDialogProps {
    winner: string;
    onClose: () => void;
}

export const WinnerDialog: React.FC<WinnerDialogProps> = ({ winner, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-brutal-white p-8 rounded-lg shadow-lg text-center">
                <h2 className="text-3xl font-bold mb-4">🎉 {winner} Wins! 🎉</h2>
                <Button
                    onClick={onClose}
                    className="mt-4 bg-brutal-pink text-white border-4 border-brutal-black font-bold 
            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 
            hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                    Close
                </Button>
            </div>
        </div>
    );
};
