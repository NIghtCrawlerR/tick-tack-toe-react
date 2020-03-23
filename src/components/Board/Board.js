import React, { Component } from 'react';

import { PLAYER_X, PLAYER_0, CHECK_END_GAME, GAME_BOARD, MULTI_PLAYER, SINGLE_PLAYER } from '../../config';
import StartMenu from '../StartMenu';
import EndGameMenu from '../EndGameMenu';
import Grid from '../Grid';
import GridWithRobot from '../GridWithRobot';

import './Board.scss';

class Board extends Component {
  state = {
    mode: null,
    gameStarted: false,
    endGame: false,
    isDraw: false,
    currentPlayer: PLAYER_X,
    humanPlayer: null,
    robotPlayer: null,
    gameBoardCopy: GAME_BOARD,
    score: {
      X: 0,
      0: 0,
    }
  }

  setMode = (mode) => {
    this.setState({
      mode,
      gameStarted: mode === MULTI_PLAYER ? true : false,
    });
  }

  setPlayer = (player) => {
    this.setState({
      humanPlayer: player,
      robotPlayer: player === PLAYER_X ? PLAYER_0 : PLAYER_X,
      gameStarted: true,
    })
  }

  switchPlayer = () => {
    const { currentPlayer } = this.state;

    this.setState({
      currentPlayer: currentPlayer === PLAYER_X ? PLAYER_0 : PLAYER_X,
    })
  }

  updateBoard = index => {
    const { gameBoardCopy, currentPlayer, mode, humanPlayer } = this.state;
    const newBoard = [...gameBoardCopy];

    if (newBoard[index]) return null;

    newBoard[index] = currentPlayer;

    this.setState({ gameBoardCopy: newBoard });
    
    const { endGame, isDraw } = CHECK_END_GAME(newBoard);

    if (endGame) {
      this.setState({ isDraw });

      setTimeout(() => {
        this.endGame(currentPlayer);
      }, 400);

      // Return promise for SINGLE PLAYER mode
      if (mode === SINGLE_PLAYER && currentPlayer === humanPlayer) {
        return new Promise((resolve) => resolve({ board: gameBoardCopy, index }));
      }

      return false;
    }

    this.switchPlayer();
    if (mode === SINGLE_PLAYER && currentPlayer === humanPlayer) {
      return new Promise((resolve) => {
        setTimeout(() => resolve({ board: newBoard, index }), 200)
      })
    }
  }

  endGame = (currentPlayer) => {
    const { score, isDraw } = this.state;

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
      score,
      mode,
      robotPlayer,
      humanPlayer,
    } = this.state;

    return (
      <div className="Board">
        <h3 className="Board__title">Tick Tack Toe</h3>

        <div className="Board__playzone">
          {/* START MENU */}
          {!gameStarted && !endGame && (
            <StartMenu
              setMode={this.setMode}
              setPlayer={this.setPlayer}
              mode={mode}
            />
          )}

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
          {gameStarted && mode === MULTI_PLAYER && (
            <Grid
              currentPlayer={currentPlayer}
              board={gameBoardCopy}
              updateBoard={this.updateBoard}
            />
          )}

           {/* GRID WITH ROBOT */}
           {gameStarted && mode === SINGLE_PLAYER && (
            <GridWithRobot
              currentPlayer={currentPlayer}
              robotPlayer={robotPlayer}
              humanPlayer={humanPlayer}
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