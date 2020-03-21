import React, { Component } from 'react';

import Cell from '../Cell';

import './Grid.scss';

class Grid extends Component {
  render() {
    const { board, updateBoard } = this.props;

    return (
      <div className="Grid">
          {board.map((symbol, i) => <Cell key={i} content={symbol} onClick={() => updateBoard(i)} />)}
      </div>
    );
  }
}
 
export default Grid;