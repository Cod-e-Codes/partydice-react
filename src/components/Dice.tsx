// src/components/Dice.tsx

import { useState } from "react";

interface DiceProps {
  onRoll: (value: number) => void;
  disabled?: boolean; // **Added disabled prop**
}

export const Dice = ({ onRoll, disabled = false }: DiceProps) => {
  const [value, setValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    if (isRolling || disabled) return; // **Prevent rolling if disabled**

    setIsRolling(true);
    const newValue = Math.floor(Math.random() * 6) + 1;

    setTimeout(() => {
      setValue(newValue);
      setIsRolling(false);
      onRoll(newValue);
    }, 500); // **Duration of the rolling animation**
  };

  return (
    <button
      onClick={rollDice}
      disabled={isRolling || disabled} // **Disable button based on props and internal state**
      className={`w-24 h-24 bg-brutal-white border-4 border-brutal-black font-bold text-4xl
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center
        ${isRolling || disabled ? 'opacity-50 cursor-not-allowed' : 'hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'}
        transition-all`}
    >
      {value}
    </button>
  );
};
