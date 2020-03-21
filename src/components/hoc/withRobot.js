import React from 'react';
import { get } from 'lodash';

import {
  WINNING_COMBINATIONS,
  GET_RANDOM,
} from '../../config';

function withRobot(Component) {
  
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        withRobot: true,
        robotCell: null,
      }
    }

    bestMove = (board, robotPlayer, humanPlayer) => {
      const bestPositions = WINNING_COMBINATIONS.filter(row => {
        const [a, b, c] = row;
        const boardRow = [board[a], board[b], board[c]];
        const hasEmptyCell = boardRow.filter(cell => !cell).length > 0;

        if (!hasEmptyCell) return false;

        // Check if we have row with two filled cells
        if ((board[a] && board[a] === board[b])
          || (board[b] && board[b] === board[c])
          || (board[c] && board[a] === board[c])
        ) {
            return row;
        }

        return false;
      });

      
      const robotWinPosition = bestPositions.filter(row => {
        const index = row[0];
        return board[index] === robotPlayer;
      })

      const humanWinPosition = bestPositions.filter(row => {
        const index = row[0]
        return board[index] === humanPlayer;
      })

      const singlePosition = robotWinPosition.length ? robotWinPosition : humanWinPosition;

      const cell = get(singlePosition, '0', []).filter(cell => !board[cell])
  
      return get(cell, '0');
    }

    setRobotCell = robotCell => this.setState({ robotCell });

    useStrategy = board => {
      return null;
    }

    robotMove = ({ board, isFirst, robotPlayer, humanPlayer }) => {
      const allowedCells = board.map((cell, i) => !cell ? i : null).filter(cell => cell !== null);
      const random = GET_RANDOM(allowedCells.length);

      const bestMove = this.bestMove(board, robotPlayer, humanPlayer);

      if (bestMove) {
        this.setRobotCell(bestMove)
      } else {
        this.setRobotCell(allowedCells[random]);
      }
    }
 
    render() {
      return <Component robotMove={this.robotMove} robotCell={this.state.robotCell} {...this.props} />
    }
  }
}

export default withRobot;
