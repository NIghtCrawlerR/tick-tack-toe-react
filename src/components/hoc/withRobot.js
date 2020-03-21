import React from 'react';
import { get } from 'lodash';

import { WINNING_COMBINATIONS } from '../../config';

function withRobot(Component) {
  
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        withRobot: true,
        robotCell: null,
      }
    }

    bestMove = board => {
      const bestPosition = WINNING_COMBINATIONS.filter(row => {
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
      })

      const cell = get(bestPosition, '0', []).filter(cell => !board[cell])

      return get(cell, '0');
    }

    makeMove = (robotCell) => {
      console.log('CELL', robotCell)
      this.setState({
        robotCell,
      })
    }
  
    aiMove = (gameBoard) => {
      // const allowedCells = gameBoard.map((cell, i) => !cell ? i : null).filter(cell => cell !== null);
      // const random = Math.floor(Math.random() * allowedCells.length);
      const getRand = () => {
        const rand = Math.floor(Math.random() * 9);

        if (gameBoard[rand]) {
          return getRand()
        } else {
          return rand;
        }
      }

      if (this.bestMove(gameBoard)) this.makeMove(this.bestMove(gameBoard))
      else this.makeMove(getRand())
    }

    robotMove = (board) => {
      this.aiMove(board);
    }
 
    render() {
      return <Component robotMove={this.robotMove} robotCell={this.state.robotCell} {...this.props} />
    }
  }
}

export default withRobot;
