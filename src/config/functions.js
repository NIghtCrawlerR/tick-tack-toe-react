import { WINNING_COMBINATIONS } from './constants';

/**
 * 
 * @param {array} newBoard - []
 * 
 * Function checks if there are no empty cells left.
 * Also if checks if there are some winning positions on the board
 */
export const CHECK_END_GAME = (newBoard) => {
  // Check if we have some winning position
  const winningPositions = WINNING_COMBINATIONS.filter(row => {
    const boardRow = CREATE_BOARD_ROW(newBoard, row);
    return ARE_VALUES_EQUAL(boardRow)
  })

  // Check if no empty cells left
  if (!winningPositions.length && newBoard.every(cell => !!cell)) {
    return { endGame: true, isDraw: true };
  }

  return { endGame: winningPositions.length > 0 };
}

/**
 * 
 * @param {number} max
 * 
 * Return random int number that less or equal than max 
 */
export const GET_RANDOM = max => {
  return Math.floor(Math.random() * max)
}

/**
 * 
 * @param {array} board 
 * 
 * Return array with allowed cell indexes
 */
export const GET_ALLOWED_CELLS = board => {
  return board.map((cell, i) => !cell ? i : null).filter(cell => cell !== null);
}

/**
 * 
 * @param {array} board 
 * @param {array} row 
 * 
 * Return array with symbols (X or 0) from some indexes
 */
export const CREATE_BOARD_ROW = (board, row) => {
  const [a, b, c] = row;
  return [
    board[a],
    board[b],
    board[c],
  ]
}

/**
 * Function check if all values in array are true and equal
 */
export const ARE_VALUES_EQUAL = array => array.every(value => value && value === array[0]);