// src/pages/Index.tsx

import { useState } from "react";
import { Player, GameState, Challenge, CHALLENGES, GameMode } from "@/types/game";
import { PlayerCard } from "@/components/PlayerCard";
import { AddPlayerForm } from "@/components/AddPlayerForm";
import { Dice } from "@/components/Dice";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { GameModeSelector } from "@/components/GameModeSelector";
import { WinnerDialog } from "@/components/WinnerDialog";
import { EndGameDialog } from "@/components/EndGameDialog"; // **Import the EndGameDialog**

const Index = () => {
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    currentPlayerIndex: 0,
    isPlaying: false,
    rollHistory: [],
  });

  const [winner, setWinner] = useState<string | null>(null); // **State for Winner**
  const [showEndGameDialog, setShowEndGameDialog] = useState<boolean>(false); // **State for End Game Dialog**

  // **Function to handle game mode selection**
  const selectGameMode = (mode: GameMode) => {
    let target: number;
    if (mode === 'quick') {
      target = 50; // **Example target score for Quick Play**
    } else {
      target = 100; // **Example target score for Full Game**
    }

    setGameState((prev) => ({
      ...prev,
      gameMode: mode,
      targetScore: target,
    }));

    toast.success(`Game mode set to ${mode === 'quick' ? 'Quick Play' : 'Full Game'}!`);
  };

  const addPlayer = (playerData: Omit<Player, "id" | "points">) => {
    if (gameState.players.length >= 8) {
      toast.error("Maximum 8 players allowed!");
      return;
    }

    const newPlayer: Player = {
      ...playerData,
      id: crypto.randomUUID(),
      points: 0,
    };

    setGameState((prev) => ({
      ...prev,
      players: [...prev.players, newPlayer],
    }));

    toast.success(`${playerData.name} added to the game!`);
  };

  const removePlayer = (id: string) => {
    if (gameState.isPlaying) {
      toast.error("Cannot remove players while the game is in progress!");
      return;
    }

    if (gameState.players.length <= 2) {
      toast.error("At least two players are required to continue the game!");
      return;
    }

    setGameState((prev) => ({
      ...prev,
      players: prev.players.filter((p) => p.id !== id),
    }));

    toast.success("Player removed successfully!");
  };

  const startGame = () => {
    if (gameState.players.length < 2) {
      toast.error("Need at least 2 players to start!");
      return;
    }

    if (!gameState.gameMode || !gameState.targetScore) {
      toast.error("Please select a game mode before starting!");
      return;
    }

    setGameState((prev) => ({
      ...prev,
      isPlaying: true,
      currentPlayerIndex: 0, // **Reset to the first player**
      rollHistory: [], // **Clear previous roll history**
      players: prev.players.map((player) => ({ ...player, points: 0 })), // **Reset player points to 0**
    }));

    toast.success("Game started!");
  };

  const handleRoll = (value: number) => {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];

    // Filter challenges based on the current player's gender
    const genderSpecificChallenges = CHALLENGES.filter(
      (challenge) => challenge.gender === currentPlayer.gender
    );

    // Select a random challenge from the gender-specific challenges
    const randomIndex = Math.floor(Math.random() * genderSpecificChallenges.length);
    const challengeTemplate = genderSpecificChallenges[randomIndex];

    // Dynamically set points based on the dice value
    const dynamicPoints = value; // Modify this logic if needed

    setGameState((prev) => ({
      ...prev,
      rollHistory: [
        {
          playerId: currentPlayer.id,
          playerName: currentPlayer.name,
          diceValue: value,
          challenge: challengeTemplate,
          points: dynamicPoints, // Assign points separately
          completed: false,
          timestamp: new Date(),
        },
        ...prev.rollHistory,
      ],
    }));

    toast.success(
      <div className="space-y-2">
        <p>
          {currentPlayer.name} rolled a {value}!
        </p>
        <p className="font-bold">Challenge: {challengeTemplate.description}</p>
        <p className="text-sm">Worth {dynamicPoints} points</p>
      </div>
    );
  };

  const completeChallenge = (completed: boolean) => {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    const lastChallenge = gameState.rollHistory[0];

    setGameState((prev) => {
      const updatedPlayers = prev.players.map((player) =>
        player.id === currentPlayer.id
          ? {
            ...player,
            points: player.points + (completed ? lastChallenge.points : 0),
          }
          : player
      );

      // Check if any player has reached or exceeded the target score
      const winningPlayer = updatedPlayers.find(player => player.points >= (prev.targetScore || 100));

      if (winningPlayer) {
        setWinner(winningPlayer.name); // **Set the winner**
        return {
          ...prev,
          players: updatedPlayers,
          rollHistory: [
            { ...prev.rollHistory[0], completed },
            ...prev.rollHistory.slice(1),
          ],
          isPlaying: false, // **End the game**
        };
      }

      return {
        ...prev,
        players: updatedPlayers,
        rollHistory: [
          { ...prev.rollHistory[0], completed },
          ...prev.rollHistory.slice(1),
        ],
        currentPlayerIndex:
          (prev.currentPlayerIndex + 1) % prev.players.length,
      };
    });

    toast.success(
      completed
        ? `${currentPlayer.name} completed the challenge and earned ${lastChallenge.points} points!`
        : `${currentPlayer.name} skipped the challenge. No points earned.`
    );
  };

  // **Determine if there's a pending challenge**
  const hasPendingChallenge =
    gameState.rollHistory.length > 0 && !gameState.rollHistory[0].completed;

  // **Handle closing the Winner Dialog**
  const closeWinnerDialog = () => {
    setWinner(null);
    // Optionally reset the game state or provide options to restart
  };

  // **Handle confirming end game**
  const confirmEndGame = () => {
    setShowEndGameDialog(false);
    setGameState((prev) => ({
      ...prev,
      isPlaying: false,
      gameMode: undefined,
      targetScore: undefined,
      rollHistory: [],
      currentPlayerIndex: 0,
    }));
    toast.info("Game ended early.");
  };

  // **Handle cancelling end game**
  const cancelEndGame = () => {
    setShowEndGameDialog(false);
  };

  // **Trigger the End Game dialog**
  const triggerEndGame = () => {
    setShowEndGameDialog(true);
  };

  return (
    <div className="min-h-screen bg-brutal-white p-8">
      <Navigation />
      <div className="max-w-4xl mx-auto">
        {/* Responsive Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
          <h1 className="text-4xl sm:text-6xl font-black text-brutal-black">
            Party<span className="text-brutal-pink">Dice</span>
            <span className="text-brutal-yellow">!</span>
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column: Players */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Players</h2>
              {gameState.isPlaying && (
                <div className="text-sm font-medium">
                  Current Turn: {gameState.players[gameState.currentPlayerIndex].name}
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {gameState.players.map((player, index) => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  onRemove={removePlayer}
                  isActive={
                    gameState.isPlaying && index === gameState.currentPlayerIndex
                  }
                  disableRemove={gameState.isPlaying} // **Disable remove during active game**
                />
              ))}
            </div>
          </div>

          {/* Right Column: Game Controls */}
          <div className="space-y-6">
            {/* **Header with Game Status and End Game Early Button** */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {gameState.isPlaying ? "Game in Progress" : "Add New Player"}
              </h2>
              {gameState.isPlaying && (
                <Button
                  onClick={triggerEndGame}
                  className="bg-red-500 text-white border-4 border-red-700 font-bold 
                    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 
                    hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  End Game Early
                </Button>
              )}
            </div>

            {!gameState.isPlaying ? (
              <>
                {/* **If no game mode is selected, show the GameModeSelector** */}
                {!gameState.gameMode ? (
                  <GameModeSelector onSelectMode={selectGameMode} />
                ) : (
                  <>
                    <AddPlayerForm onAddPlayer={addPlayer} />
                    {gameState.players.length >= 2 && (
                      <Button
                        onClick={startGame}
                        className="w-full bg-brutal-pink text-white border-4 border-brutal-black font-bold 
                          shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 
                          hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                      >
                        Start Game!
                      </Button>
                    )}
                  </>
                )}
              </>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col items-center gap-4">
                  <h3 className="text-xl font-bold">
                    {gameState.players[gameState.currentPlayerIndex].name}'s Turn
                  </h3>
                  {/* **Pass the disabled prop to Dice** */}
                  <Dice onRoll={handleRoll} disabled={hasPendingChallenge} />

                  {hasPendingChallenge && (
                    <>
                      <div className="flex gap-2 mt-4">
                        <Button
                          onClick={() => completeChallenge(true)}
                          className="bg-green-500 text-white border-4 border-green-700 font-bold 
                     shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-green-600 hover:translate-y-1 
                     hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                        >
                          Complete Challenge
                        </Button>
                        <Button
                          onClick={() => completeChallenge(false)}
                          className="bg-gray-200 text-black border-4 border-gray-400 font-bold 
                     shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-300 hover:translate-y-1 
                     hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                        >
                          Skip Challenge
                        </Button>
                      </div>
                    </>
                  )}
                </div>

                {/* **Display Target Score** */}
                {gameState.targetScore && (
                  <div className="text-center text-lg font-semibold mt-4">
                    <p>First to reach <span className="text-brutal-yellow">{gameState.targetScore}</span> points wins!</p>
                  </div>
                )}

                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Scoreboard</h3>
                  <div className="space-y-2">
                    {gameState.players
                      .sort((a, b) => b.points - a.points)
                      .map((player) => (
                        <div
                          key={player.id}
                          className={`flex justify-between items-center p-2 bg-white border-2 border-brutal-black ${player.name === winner ? 'bg-brutal-yellow' : ''}`}
                        >
                          <span>{player.name}</span>
                          <span className="font-bold">
                            {player.points} points
                          </span>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Recent Rolls</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {gameState.rollHistory.map((roll, index) => (
                      <div
                        key={index}
                        className="p-2 bg-white border-2 border-brutal-black"
                      >
                        <div className="flex justify-between text-sm">
                          <span>{roll.playerName}</span>
                          <span>
                            {new Date(roll.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm mt-1">
                          {roll.challenge.description}
                        </p>
                        <div className="flex justify-between text-sm mt-1">
                          <span>Points: {roll.points}</span>
                          <span>
                            {roll.completed
                              ? "✅ Completed"
                              : roll.completed === false
                                ? "⏭️ Skipped"
                                : "Pending"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* **Winner Dialog** */}
          {winner && <WinnerDialog winner={winner} onClose={closeWinnerDialog} />}

          {/* **End Game Confirmation Dialog** */}
          {showEndGameDialog && (
            <EndGameDialog onConfirm={confirmEndGame} onCancel={cancelEndGame} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
