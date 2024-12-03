import { useState } from "react";
import { Player } from "@/types/game";

interface AddPlayerFormProps {
  onAddPlayer: (player: Omit<Player, "id">) => void;
}

export const AddPlayerForm = ({ onAddPlayer }: AddPlayerFormProps) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other">("other");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddPlayer({ 
        name, 
        gender, 
        points: 0  // Add default points when creating a new player
      });
      setName("");
      setGender("other");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Player name"
          className="w-full p-2 border-4 border-brutal-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        />
      </div>
      <div>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value as "male" | "female" | "other")}
          className="w-full p-2 border-4 border-brutal-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-brutal-yellow border-4 border-brutal-black font-bold 
          shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
          transition-all"
      >
        Add Player
      </button>
    </form>
  );
};