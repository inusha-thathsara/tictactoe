import React, { useState } from "react";
import { Users, Cpu, Gamepad2 } from "lucide-react";
interface GameMenuProps {
  onModeSelect: (mode: "ai" | "friend", player1Name: string, player2Name?: string, difficulty?: "easy" | "medium" | "hard" | "impossible") => void;
}
export const GameMenu: React.FC<GameMenuProps> = ({
  onModeSelect
}) => {
  const [mode, setMode] = useState<"ai" | "friend" | null>(null);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard" | "impossible">("easy");
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!player1Name) return;
    if (mode === "friend" && !player2Name) return;
    onModeSelect(mode!, player1Name, mode === "friend" ? player2Name : undefined, mode === "ai" ? difficulty : undefined);
  };
  if (!mode) {
    return <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-50 p-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 animate-slide-in">
          Tic Tac Toe
        </h1>
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <button onClick={() => setMode("ai")} className="flex items-center justify-center gap-2 bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-all duration-300 hover:scale-105 animate-slide-in" style={{
          animationDelay: "100ms"
        }}>
            <Cpu size={24} className="animate-bounce-slow" />
            Play vs AI
          </button>
          <button onClick={() => setMode("friend")} className="flex items-center justify-center gap-2 bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-all duration-300 hover:scale-105 animate-slide-in" style={{
          animationDelay: "200ms"
        }}>
            <Users size={24} className="animate-bounce-slow" />
            Play vs Friend
          </button>
        </div>
      </div>;
  }
  return <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-50 p-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 animate-slide-in">
        {mode === "ai" ? "Game Setup" : "Enter Names"}
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-xs animate-fade-in">
        <div>
          <label htmlFor="player1" className="block text-sm font-medium text-gray-700 mb-1" style={{ color: 'blue' }}>
            Player 1 (X)
          </label>
          <input type="text" id="player1" value={player1Name} onChange={e => setPlayer1Name(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Enter your name" required style={{ color: 'blue' }}/>
        </div>
        {mode === "ai" && <div className="animate-slide-in">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              AI Difficulty
            </label>
            <div className="grid grid-cols-2 gap-2">
              {["easy", "medium", "hard", "impossible"].map(level => <button key={level} type="button" onClick={() => setDifficulty(level as any)} className={`p-2 rounded-md border transition-all duration-300 ${difficulty === level ? "bg-blue-500 text-white border-blue-500" : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"}`}>
                  <span className="capitalize">{level}</span>
                </button>)}
            </div>
          </div>}
        {mode === "friend" && <div>
            <label htmlFor="player2" className="block text-sm font-medium text-gray-700 mb-1" style={{ color: 'green' }}>
              Player 2 (O)
            </label>
            <input type="text" id="player2" value={player2Name} onChange={e => setPlayer2Name(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Enter your name" required style={{ color: 'green' }}/>
          </div>}
        <button type="submit" className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-colors mt-4 flex items-center justify-center gap-2">
          <Gamepad2 size={20} />
          Start Game
        </button>
        <button type="button" onClick={() => setMode(null)} className="text-gray-600 hover:text-gray-800">
          Back
        </button>
      </form>
    </div>;
};