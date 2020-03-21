import React from 'react';

import Button from '../Button';

import './EndGameMenu.scss';

const EndGameMenu = ({ isDraw, playerWins, resetBoard, resetGame, score }) => (
  <div className="EndGameMenu">
    <h3 className="EndGameMenu__title">
      {isDraw && 'Draw!'}
      {!isDraw && `Player ${playerWins} wins!`}
    </h3>
    <div className="EndGameMenu__score">
      {Object.keys(score).map((player, i) => (
        <p key={i}>
          Player {player} score: {score[player]}
        </p>
      ))}
    </div>
    <Button onClick={resetBoard}>
      Play again
    </Button>
    <Button onClick={resetGame}>
      Main menu
    </Button>
  </div>
)
 
export default EndGameMenu;