import React from "react";
import { X, Circle, RotateCcw, ArrowLeft, Flame, Cpu } from "lucide-react";
interface GameBoardProps {
  board: string[];
  onCellClick: (index: number) => void;
  currentPlayer: "X" | "O";
  winner: string | null;
  isDraw: boolean;
  onReset: () => void;
  onBack: () => void;
  gameMode: "ai" | "friend";
  player1Name: string;
  player2Name: string;
  player1Streak: number;
  player2Streak: number;
  difficulty: string;
}
export const GameBoard: React.FC<GameBoardProps> = ({
  board,
  onCellClick,
  currentPlayer,
  winner,
  isDraw,
  onReset,
  onBack,
  gameMode,
  player1Name,
  player2Name,
  player1Streak,
  player2Streak,
  difficulty
}) => {
  const getCurrentPlayerName = () => {
    if (currentPlayer === "X") return player1Name;
    return gameMode === "ai" ? "AI" : player2Name;
  };
  //console.log(difficulty)

  const getWinnerName = () => {
    if (!winner) return "";
    if (winner === "X") return player1Name;
    return gameMode === "ai" ? "AI" : player2Name;
  };
  const isWinningCell = (index: number) => {
    if (!winner) return false;
    const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    return lines.some(([a, b, c]) => board[a] === winner && board[b] === winner && board[c] === winner && [a, b, c].includes(index));
  };
  const getAIName = () => {
    if (gameMode !== "ai") return player2Name;
    return `AI `;
  };
  return <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-50 p-4">
      {gameMode === "ai" && <div className="flex items-center gap-2 mb-4 bg-blue-50 px-4 py-2 rounded-full animate-slide-in">
          <Cpu size={18} className="text-blue-500" />
          <span className="text-blue-700 font-medium capitalize">
            AI Difficulty: {difficulty}
          </span>
        </div>}
      <div className="flex justify-between w-full max-w-md mb-6 animate-slide-in">
        <div className="flex items-center gap-2">
          <span className="font-medium" style={{ color: 'blue' }}>{player1Name} (X)</span>
          {player1Streak > 0 && <div className="flex items-center gap-1 text-orange-500 animate-slide-in">
              <Flame size={16} className="animate-bounce-slow" />
              <span className="font-bold animate-celebrate">
                {player1Streak}
              </span>
            </div>}
        </div>
        <div className="flex items-center gap-2">
          {player2Streak > 0 && <div className="flex items-center gap-1 text-orange-500 animate-slide-in">
              <Flame size={16} className="animate-bounce-slow" />
              <span className="font-bold animate-celebrate">
                {player2Streak}
              </span>
            </div>}
          <span className="font-medium" style={{ color: 'green' }}>
            {gameMode === "ai" ? getAIName() : player2Name} (O)
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center w-full max-w-md mb-4 animate-slide-in" style={{
      animationDelay: "100ms"
    }}>
        <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-300">
          <ArrowLeft size={20} />
          Back
        </button>
        <div className="text-lg font-medium text-gray-800 animate-fade-in">
          {winner ? `Winner: ${getWinnerName()}` : isDraw ? "It's a Draw!" : `${getCurrentPlayerName()}'s Turn`}
        </div>
        <button onClick={onReset} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-300">
          <RotateCcw size={20} className="hover:rotate-180 transition-transform duration-300" />
          Reset
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 w-full max-w-md animate-slide-in" style={{
      animationDelay: "200ms"
    }}>
        {board.map((cell, index) => <button key={index} onClick={() => onCellClick(index)} disabled={!!cell || !!winner || isDraw} className={`aspect-square bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center text-4xl cell-hover transition-all duration-300 ${isWinningCell(index) ? "winner-cell" : ""}`}>
            {cell === "X" && <X size={40} className="text-blue-500 animate-fade-in" />}
            {cell === "O" && <Circle size={40} className="text-green-500 animate-fade-in" />}
          </button>)}
      </div>
    </div>;
};