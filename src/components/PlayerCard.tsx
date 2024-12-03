// src/components/PlayerCard.tsx

import { Player } from "@/types/game";
import { X } from "lucide-react";

interface PlayerCardProps {
  player: Player;
  onRemove: (id: string) => void;
  isActive?: boolean;
  disableRemove?: boolean; // **New prop to disable removal**
}

export const PlayerCard = ({
  player,
  onRemove,
  isActive = false,
  disableRemove = false, // **Default to false**
}: PlayerCardProps) => {
  return (
    <div
      className={`relative p-4 bg-brutal-white border-4 border-brutal-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
        ${isActive ? "ring-4 ring-brutal-yellow" : ""} 
        animate-bounce-in`}
    >
      {/* **Conditionally render the remove button based on disableRemove** */}
      {!disableRemove && (
        <button
          onClick={() => onRemove(player.id)}
          className="absolute top-2 right-2 hover:text-brutal-pink transition-colors"
          title="Remove Player"
        >
          <X size={20} />
        </button>
      )}
      {/* **If remove is disabled, optionally show a disabled icon or no icon** */}
      {disableRemove && (
        <button
          disabled
          className="absolute top-2 right-2 text-gray-400 cursor-not-allowed"
          title="Cannot remove players during an active game"
        >
          <X size={20} />
        </button>
      )}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xl font-bold">{player.name}</span>
        <span className="text-sm capitalize">{player.gender}</span>
        <span className="text-sm font-bold">{player.points} points</span>
      </div>
    </div>
  );
};
