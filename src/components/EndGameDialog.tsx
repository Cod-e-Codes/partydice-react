// src/components/EndGameDialog.tsx

import React from 'react';
import { Button } from "@/components/ui/button";

interface EndGameDialogProps {
    onConfirm: () => void;
    onCancel: () => void;
}

export const EndGameDialog: React.FC<EndGameDialogProps> = ({ onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-brutal-white p-8 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-bold mb-4">End Game Early</h2>
                <p className="mb-6">Are you sure you want to end the game early?</p>
                <div className="flex justify-center gap-4">
                    <Button
                        onClick={onConfirm}
                        className="bg-red-500 text-white border-2 border-red-700 font-bold 
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 
              hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                    >
                        Yes, End Game
                    </Button>
                    <Button
                        onClick={onCancel}
                        className="bg-gray-300 text-black border-2 border-gray-500 font-bold 
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 
              hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};
