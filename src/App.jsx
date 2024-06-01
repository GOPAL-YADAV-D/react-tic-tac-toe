import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

import { WINNING_COMBINATIONS } from "./Winning-Combinations";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveCurrentPlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player == "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  const gameBoard = [
    ...INITIAL_GAME_BOARD.map((innerArray) => [...innerArray]),
  ];

  for (const turn of gameTurns) {
    gameBoard[turn.square.row][turn.square.col] = turn.player;
  }

  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner = null;

  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol =
      gameBoard[combinations[1].row][combinations[1].column];
    const thirdSqaureSymbol =
      gameBoard[combinations[2].row][combinations[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSqaureSymbol
    ) {
      return (winner = players[firstSquareSymbol]);
    }
  }
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X");
  // The change of state if periodic as the active state of player changes on each run

  const activePlayer = deriveCurrentPlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));

    setGameTurns((prevTurns) => {
      const currentPlayer = deriveCurrentPlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        {/* An ordered list due to symatic html as players are ordered */}
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSquareSelect={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
