import React from 'react';
import { get } from 'lodash';

import {
  WINNING_COMBINATIONS,
  GET_RANDOM,
  GET_ALLOWED_CELLS,
  CENTER_CELL,
  FIRST_MOVE,
  GET_MOVE_COUNT,
  CREATE_BOARD_ROW,
  ALLOWED_CORNERS,
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

    useStrategy = ({ board, isFirst, robotPlayer, cellIndex }) => {
      const allowedCorners = ALLOWED_CORNERS(board);
      const allowedCells = GET_ALLOWED_CELLS(board);
      const moveCount = GET_MOVE_COUNT(board, robotPlayer);
      const randomCorner = GET_RANDOM(allowedCorners.length - 1);

      const isAllowed = cell => allowedCells.includes(cell);

      // IS FIRST

      // If robot moves first try and it is FIRST turn =>
      // fill one of the corner positions
      if (isFirst && moveCount === FIRST_MOVE) {
        const nextMove = allowedCorners[randomCorner];
        return { success: true, nextMove };
      }

      // IS SECOND

      // If robot move second try to fill center position
      if (!isFirst && moveCount === FIRST_MOVE) {
        const nextMove = isAllowed(CENTER_CELL) ? CENTER_CELL : allowedCorners[randomCorner];
        return { success: true, nextMove };
      }

      if (allowedCorners.length) {
        return { success: true, nextMove: allowedCorners[randomCorner] };
      }

      return { success: false };
    }

    robotMove = ({ board, isFirst, robotPlayer, humanPlayer, cellIndex }) => {
      const allowedCells = GET_ALLOWED_CELLS(board);
      const random = GET_RANDOM(allowedCells.length);

      const bestMove = this.bestMove(board, robotPlayer, humanPlayer);
      const strategy = this.useStrategy({ board, isFirst, robotPlayer, cellIndex });

      if (bestMove) {
        this.setRobotCell(bestMove);
      } else if(strategy.success) {
        this.setRobotCell(strategy.nextMove);
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
