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
    const { robotPlayer, currentPlayer, robotMove, board } = this.props;
    if (robotPlayer === currentPlayer) {
      robotMove(board);
    }
  }

  componentDidUpdate(prevProps) {
    const { updateBoard, robotCell, board } = this.props;
    if (prevProps.robotCell !== robotCell) {
      updateBoard(robotCell, board)
    }
  }

  makeMove = (i, board) => {
    const { updateBoard, robotMove } = this.props;

    updateBoard(i, board)
      .then(board => robotMove(board))
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