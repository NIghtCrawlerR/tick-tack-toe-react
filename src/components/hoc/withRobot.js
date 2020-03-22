import React from 'react';
import { get } from 'lodash';

import {
  WINNING_COMBINATIONS,
  GET_RANDOM,
  GET_ALLOWED_CELLS,
  CORNER_CELLS,
  CENTER_CELL,
  FIRST_MOVE,
  GET_MOVE_COUNT,
  CREATE_BOARD_ROW,
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
        const boardRow = CREATE_BOARD_ROW(board, row).filter(cell => cell);

        // Check if we have row with one empty cell and two matching
        // If true - return this row as matching best position
        if (boardRow.length === 2 && boardRow[0] === boardRow[1]) {
          return row;
        }

        return false;
      });

      const getWinPositions = player => {
        return function () {
          return bestPositions.filter(row => {
            const boardRow = CREATE_BOARD_ROW(board, row);
            return boardRow.includes(player);
          })
        }
      }
      
      const robotWinPosition = getWinPositions(robotPlayer);
      const humanWinPosition = getWinPositions(humanPlayer);

      const singlePosition = robotWinPosition().length ? robotWinPosition() : humanWinPosition();

      const cell = get(singlePosition, '0', []).filter(cell => !board[cell])
  
      return get(cell, '0');
    }

    setRobotCell = robotCell => this.setState({ robotCell });

    useStrategy = ({ board, isFirst, robotPlayer }) => {
      const allowedCells = GET_ALLOWED_CELLS(board);
      const moveCount = GET_MOVE_COUNT(board, robotPlayer);
      const random = GET_RANDOM(4);

      const isAllowed = cell => allowedCells.includes(cell);

      if (!isFirst && moveCount === FIRST_MOVE) {
        return isAllowed(CENTER_CELL) ? CENTER_CELL : CORNER_CELLS[random];
      }

      if (isFirst && moveCount === FIRST_MOVE) {
        return CORNER_CELLS[random];
      }
      return null;
    }

    robotMove = ({ board, isFirst, robotPlayer, humanPlayer }) => {
      const allowedCells = GET_ALLOWED_CELLS(board);
      const random = GET_RANDOM(allowedCells.length);

      const bestMove = this.bestMove(board, robotPlayer, humanPlayer);
      const strategy = this.useStrategy({ board, isFirst, robotPlayer });

      if (bestMove) {
        this.setRobotCell(bestMove)
      } else if(strategy) {
        this.setRobotCell(strategy)
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
