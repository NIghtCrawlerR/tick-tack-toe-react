import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withRobot from '../hoc/withRobot';
import Cell from '../Cell';

import '../Grid/Grid.scss';

class GridWithRobot extends Component {
  static propTypes = {
    board: PropTypes.array.isRequired,
  };

  constructor(props) {
    super();

    this.state = {
      isFirst: props.robotPlayer === props.currentPlayer,
    };
  }

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
    const { isFirst } = this.state;

    if (robotPlayer === currentPlayer) {
      robotMove({ board, isFirst });
    }

    return null;
  }

  makeMove = (i, board) => {
    const { updateBoard, robotMove, robotPlayer, humanPlayer } = this.props;
    const { isFirst } = this.state;

    updateBoard(i, board)
      .then(({ board, index }) => {
        robotMove({ board, robotPlayer, humanPlayer, cellIndex: index, isFirst })
      })
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