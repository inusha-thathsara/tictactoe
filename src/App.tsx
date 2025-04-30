import React, { useEffect, useState } from "react";
import { GameMenu } from "./components/GameMenu";
import { GameBoard } from "./components/GameBoard";

export function App() {
  const [gameMode, setGameMode] = useState<"ai" | "friend" | null>(null);
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [board, setBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<string | null>(null);
  const [isDraw, setIsDraw] = useState(false);
  const [player1Streak, setPlayer1Streak] = useState(0);
  const [player2Streak, setPlayer2Streak] = useState(0);
    const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard" | "impossible">("easy");
  
  

  const [gameStarted, setGameStarted] = useState(false);
  

  
  const checkWinner = (squares: string[]) => {
    const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };
  const checkDraw = (squares: string[]) => {
    return squares.every(square => square !== "");
  };
  const handleCellClick = (index: number) => {
    if (board[index] || winner || isDraw) return;
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      if (newWinner === "X") {
        setPlayer1Streak(prev => prev + 1);
        setPlayer2Streak(0);
      } else {
        setPlayer2Streak(prev => prev + 1);
        setPlayer1Streak(0);
      }
      return;
    }
    if (checkDraw(newBoard)) {
      setIsDraw(true);
      return;
    }
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };
  const minimax = (board: string[], depth: number, isMaximizing: boolean): number => {
    const winner = checkWinner(board);
    if (winner === "O") return 1;
    if (winner === "X") return -1;
    if (checkDraw(board)) return 0;
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
          board[i] = "O";
          const score = minimax(board, depth + 1, false);
          board[i] = "";
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
          board[i] = "X";
          const score = minimax(board, depth + 1, true);
          board[i] = "";
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };
  const getBestMove = (board: string[]): number => {
    let bestScore = -Infinity;
    let bestMove = 0;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = "O";
        const score = minimax(board, 0, false);
        board[i] = "";
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  };
  const aiMove = () => {
    const emptyCells = board.map((cell, index) => cell === "" ? index : null).filter(index => index !== null) as number[];
    if (emptyCells.length === 0) return;
    let moveIndex: number;
    switch (difficulty) {
      case "impossible":
        moveIndex = getBestMove([...board]);
        break;
      case "hard":
        moveIndex = Math.random() < 0.8 ? getBestMove([...board]) : emptyCells[Math.floor(Math.random() * emptyCells.length)];
        break;
      case "medium":
        moveIndex = Math.random() < 0.4 ? getBestMove([...board]) : emptyCells[Math.floor(Math.random() * emptyCells.length)];
        break;
      case "easy":
      default:
        moveIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        break;
    }
    handleCellClick(moveIndex);
  };
  const handleModeSelect = (mode: "ai" | "friend", p1Name: string, p2Name?: string, aiDifficulty?: "easy" | "medium" | "hard" | "impossible") => {
    setGameMode(mode);
    setPlayer1Name(p1Name);
    setPlayer2Name(p2Name || "AI");
    if (aiDifficulty) setDifficulty(aiDifficulty);
    setPlayer1Streak(0);
    setPlayer2Streak(0);
    setGameStarted(true);
  };
  const handleReset = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setWinner(null);
    setIsDraw(false);
  };
  const handleBack = () => {
    setGameMode(null);
    setPlayer1Name("");
    setPlayer2Name("");
    setPlayer1Streak(0);
    setPlayer2Streak(0);
    handleReset();
  };
  useEffect(() => {
    if (gameMode === "ai" && currentPlayer === "O" && !winner && !isDraw) {
      const timer = setTimeout(aiMove, 500);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameMode]);
  if (!gameMode) {
    return <GameMenu onModeSelect={handleModeSelect} />;
  }
  if (!gameStarted) {
    return <GameMenu onModeSelect={handleModeSelect} />;
  }
  return (
    <GameBoard
      board={board}
      onCellClick={handleCellClick}
      currentPlayer={currentPlayer}
      winner={winner}
      isDraw={isDraw}
      onReset={handleReset}
      onBack={handleBack}
      gameMode={gameMode}
      player1Name={player1Name}
      player2Name={player2Name}
      player1Streak={player1Streak}
      player2Streak={player2Streak}
      difficulty={difficulty}
    />
  );
  return <GameBoard board={board} onCellClick={handleCellClick} currentPlayer={currentPlayer} winner={winner} isDraw={isDraw} onReset={handleReset} onBack={handleBack} gameMode={gameMode} player1Name={player1Name} player2Name={player2Name} player1Streak={player1Streak} player2Streak={player2Streak} />;
}