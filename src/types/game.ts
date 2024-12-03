// src/types/game.ts

export type Player = {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  points: number;
};

export type Challenge = {
  id: string;
  description: string;
  gender: 'male' | 'female' | 'other';
};

export type GameMode = 'quick' | 'full';

export type GameState = {
  players: Player[];
  currentPlayerIndex: number;
  isPlaying: boolean;
  rollHistory: {
    playerId: string;
    playerName: string;
    diceValue: number;
    challenge: Challenge;
    points: number;
    completed: boolean;
    timestamp: Date;
  }[];
  gameMode?: GameMode; // **New Property**
  targetScore?: number; // **New Property**
};

export const CHALLENGES: Challenge[] = [
  // Male Challenges
  { id: 'm1', description: "Do 10 push-ups", gender: 'male' },
  { id: 'm2', description: "Tell a funny story from your childhood", gender: 'male' },
  { id: 'm3', description: "Imitate a famous movie character", gender: 'male' },
  { id: 'm4', description: "Perform a short stand-up comedy routine", gender: 'male' },
  { id: 'm5', description: "Do a quick karate move demonstration", gender: 'male' },
  { id: 'm6', description: "Share your favorite sports moment", gender: 'male' },
  { id: 'm7', description: "Pretend to be a news anchor and report the weather", gender: 'male' },
  { id: 'm8', description: "Show your best dance move", gender: 'male' },
  { id: 'm9', description: "Do a quick magic trick", gender: 'male' },
  { id: 'm10', description: "Recite a motivational quote loudly", gender: 'male' },
  { id: 'm11', description: "Act out a scene from your favorite action movie", gender: 'male' },
  { id: 'm12', description: "Demonstrate how to fix a common household item", gender: 'male' },
  { id: 'm13', description: "Perform a mock interview with another player", gender: 'male' },
  { id: 'm14', description: "Showcase your best impersonation of a celebrity", gender: 'male' },
  { id: 'm15', description: "Do a quick freestyle rap about your day", gender: 'male' },
  { id: 'm16', description: "Balance a book on your head for 30 seconds", gender: 'male' },
  { id: 'm17', description: "Perform a short juggling act", gender: 'male' },
  { id: 'm18', description: "Show your favorite workout move", gender: 'male' },
  { id: 'm19', description: "Tell a joke involving sports", gender: 'male' },
  { id: 'm20', description: "Demonstrate how to tie a necktie", gender: 'male' },

  // Female Challenges
  { id: 'f1', description: "Do 15 squats", gender: 'female' },
  { id: 'f2', description: "Share a favorite beauty tip", gender: 'female' },
  { id: 'f3', description: "Imitate a popular female singer", gender: 'female' },
  { id: 'f4', description: "Perform a short ballet or dance routine", gender: 'female' },
  { id: 'f5', description: "Tell a heartfelt compliment to another player", gender: 'female' },
  { id: 'f6', description: "Show your best yoga pose", gender: 'female' },
  { id: 'f7', description: "Pretend to be a fashion designer and describe a new outfit", gender: 'female' },
  { id: 'f8', description: "Share a favorite recipe in 30 seconds", gender: 'female' },
  { id: 'f9', description: "Do a quick makeup demonstration", gender: 'female' },
  { id: 'f10', description: "Recite a poem or a favorite song lyric", gender: 'female' },
  { id: 'f11', description: "Act out a scene from your favorite romantic movie", gender: 'female' },
  { id: 'f12', description: "Demonstrate a quick hairstyle", gender: 'female' },
  { id: 'f13', description: "Perform a short storytelling session", gender: 'female' },
  { id: 'f14', description: "Show your favorite crafting skill", gender: 'female' },
  { id: 'f15', description: "Do a quick freestyle rap about friendship", gender: 'female' },
  { id: 'f16', description: "Balance a beauty product on your nose for 30 seconds", gender: 'female' },
  { id: 'f17', description: "Perform a short hand shadow puppet show", gender: 'female' },
  { id: 'f18', description: "Share a motivational quote and explain why you like it", gender: 'female' },
  { id: 'f19', description: "Tell a joke involving fashion", gender: 'female' },
  { id: 'f20', description: "Demonstrate how to do a simple nail art design", gender: 'female' },

  // Other Challenges
  { id: 'o1', description: "Do 12 burpees", gender: 'other' },
  { id: 'o2', description: "Share an interesting fact about yourself", gender: 'other' },
  { id: 'o3', description: "Imitate a popular internet meme", gender: 'other' },
  { id: 'o4', description: "Perform a short interpretive dance", gender: 'other' },
  { id: 'o5', description: "Tell a creative short story", gender: 'other' },
  { id: 'o6', description: "Show your best animal impression", gender: 'other' },
  { id: 'o7', description: "Pretend to be a game show host and ask another player a question", gender: 'other' },
  { id: 'o8', description: "Share a unique hobby or skill", gender: 'other' },
  { id: 'o9', description: "Do a quick beatboxing routine", gender: 'other' },
  { id: 'o10', description: "Recite a favorite quote from a book or movie", gender: 'other' },
  { id: 'o11', description: "Act out a scene from a favorite fantasy movie", gender: 'other' },
  { id: 'o12', description: "Demonstrate a unique way to solve a common problem", gender: 'other' },
  { id: 'o13', description: "Perform a short mime act", gender: 'other' },
  { id: 'o14', description: "Showcase a creative art skill", gender: 'other' },
  { id: 'o15', description: "Do a quick freestyle rap about diversity", gender: 'other' },
  { id: 'o16', description: "Balance an unusual object on your chin for 30 seconds", gender: 'other' },
  { id: 'o17', description: "Perform a short shadow puppet show", gender: 'other' },
  { id: 'o18', description: "Share a motivational quote that resonates with you", gender: 'other' },
  { id: 'o19', description: "Tell a joke involving technology", gender: 'other' },
  { id: 'o20', description: "Demonstrate how to make a simple craft", gender: 'other' },
];
