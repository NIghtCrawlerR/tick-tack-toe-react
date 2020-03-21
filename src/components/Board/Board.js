import React, { Component } from 'react';

import { PLAYER_X, PLAYER_0, WINNING_COMBINATIONS, GAME_BOARD } from '../../config';
import StartMenu from '../StartMenu';
import EndGameMenu from '../EndGameMenu';
import Grid from '../Grid';

import './Board.scss';

class Board extends Component {
  state = {
    mode: null,
    gameStarted: false,
    endGame: false,
    isDraw: false,
    currentPlayer: PLAYER_X,
    gameBoardCopy: GAME_BOARD,
    score: {
      X: 0,
      0: 0,
    }
  }

  setMode = (mode) => {
    this.setState({
      mode,
      gameStarted: true,
    });
  }

  checkEndGame = (newBoard) => {
    // Check if we have some winning position
    const isWinningCombo = WINNING_COMBINATIONS.map(combo => {
      const [a, b, c] = combo;

      return newBoard[a]
        && newBoard[a] === newBoard[b]
        && newBoard[b]
        && newBoard[b] === newBoard[c]
    })

    // Check if no empty cells left
    if (newBoard.every(cell => !!cell)) {
      this.setState({ isDraw: true });
      return true;
    }

    return isWinningCombo.filter(combo => combo).length > 0;
  }

  switchPlayer = () => {
    const { currentPlayer } = this.state;

    this.setState({
      currentPlayer: currentPlayer === PLAYER_X ? PLAYER_0 : PLAYER_X,
    })
  }

  updateBoard = index => {
    const { gameBoardCopy, currentPlayer } = this.state;
    const newBoard = [...gameBoardCopy];

    if (newBoard[index]) return null;

    newBoard[index] = currentPlayer;

    this.setState({ gameBoardCopy: newBoard });
    
    if (this.checkEndGame(newBoard)) {
      this.endGame(currentPlayer, newBoard);
      return false;
    }

    this.switchPlayer();
  }

  endGame = (currentPlayer, newBoard) => {
    const { score } = this.state;
    const isDraw = newBoard.every(cell => !!cell);

    this.setState({ endGame: true });

    if (!isDraw) {
      this.setState({
        score: {
          ...score,
          [currentPlayer]: score[currentPlayer] += 1,
        },
      });
    }
  }

  resetGame = () => {
    this.setState({
      mode: null,
      gameStarted: false,
      endGame: false,
      isDraw: false,
      currentPlayer: PLAYER_X,
      gameBoardCopy: GAME_BOARD,
      score: { X: 0, 0: 0 },
    })
  }

  resetBoard = () => {
    this.setState({
      endGame: false,
      isDraw: false,
      currentPlayer: PLAYER_X,
      gameBoardCopy: GAME_BOARD,
    })
  }

  render() {
    const {
      gameStarted,
      endGame,
      currentPlayer,
      gameBoardCopy,
      isDraw,
      score
    } = this.state;

    return (
      <div className="Board">
        <div className="Board__playzone">
          {/* START MENU */}
          {!gameStarted && !endGame && <StartMenu setMode={this.setMode} />}

          {/* ENDGAME MENU */}
          {endGame && (
            <EndGameMenu
              isDraw={isDraw}
              playerWins={currentPlayer}
              score={score}
              resetBoard={this.resetBoard}
              resetGame={this.resetGame}
            />
          )}

          {/* GRID */}
          {gameStarted && !endGame && (
            <Grid
              currentPlayer={currentPlayer}
              board={gameBoardCopy}
              updateBoard={this.updateBoard}
            />
          )}
        </div>
        {/* GAME INFO */}
        {gameStarted && !endGame && <div className="Board__game-info">{currentPlayer} turn!</div>}
      </div>
    );
  }
}
 
export default Board;