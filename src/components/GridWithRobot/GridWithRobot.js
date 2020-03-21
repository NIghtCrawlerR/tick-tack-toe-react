import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withRobot from '../hoc/withRobot';
import Cell from '../Cell';

import '../Grid/Grid.scss';

class GridWithRobot extends Component {
  static propTypes = {
    board: PropTypes.array.isRequired,
  };

  componentDidMount() {
    this.firstMove();
  }

  componentDidUpdate(prevProps) {
    const { updateBoard, robotCell, board } = this.props;

    // Check if robot makes move
    if (prevProps.robotCell !== robotCell) {
      updateBoard(robotCell, board)
    }

    // Check if game was reseted
    if (board !== prevProps.board && !board.filter(cell => cell).length) {
      this.firstMove();
    }
  }

  firstMove = () => {
    const { robotPlayer, currentPlayer, robotMove, board } = this.props;

    if (robotPlayer === currentPlayer) {
      robotMove({ board, isFirst: true });
    }

    return null;
  }

  makeMove = (i, board) => {
    const { updateBoard, robotMove, robotPlayer, humanPlayer } = this.props;

    updateBoard(i, board)
      .then(board => robotMove({ board, robotPlayer, humanPlayer }))
  }

  render() {
    const { board } = this.props;

    return (
      <div className="Grid">
          {board.map((symbol, i) => <Cell key={i} content={symbol} onClick={() => this.makeMove(i, board)} />)}
      </div>
    );
  }
}

export default withRobot(GridWithRobot);