import React from 'react';
import { get } from 'lodash';

import {
  WINNING_COMBINATIONS,
  GET_RANDOM,
  GET_ALLOWED_CELLS,
  FIRST_MOVE,
  GET_MOVE_COUNT,
  CREATE_BOARD_ROW,
  ALLOWED_CORNERS,
  POSSIBLE_HUMANS_POSITIONS,
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

    findNearestRibPosition = cellIndex => {
      const nearestRibPositions = [];
      POSSIBLE_HUMANS_POSITIONS.map(row => {
        // check if human takes corner position
        if (row.positions[1] === cellIndex) {
          nearestRibPositions[0] = row.positions[0];
          nearestRibPositions[1] = row.positions[2];
        }
        return row;
      });

      return nearestRibPositions;
    }

    useStrategy = ({ board, isFirst, robotPlayer, cellIndex }) => {
      const allowedCorners = ALLOWED_CORNERS(board);
      const moveCount = GET_MOVE_COUNT(board, robotPlayer);
      const randomCorner = GET_RANDOM(allowedCorners.length - 1);

      // IF ROBOT MOVES FIRST
      // If robot moves first try and it is FIRST turn =>
      // fill one of the corner positions
      if (isFirst && moveCount === FIRST_MOVE) {
        const nextMove = allowedCorners[randomCorner];
        return { success: true, nextMove };
      }

      // IF ROBOT MOVES SECOND

      // If robot move second:
      // If human takes corner position then robot should take nearest rib position
      // In other cases try to take position at corner
      if (!isFirst && moveCount === FIRST_MOVE) {
        const nearestRibPositions = this.findNearestRibPosition(cellIndex);
        const nextMove = nearestRibPositions.length ? nearestRibPositions[0] : allowedCorners[randomCorner];

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
