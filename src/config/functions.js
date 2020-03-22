import { WINNING_COMBINATIONS } from './constants';

export const CHECK_END_GAME = (newBoard) => {
  // Check if we have some winning position
  const winningPositions = WINNING_COMBINATIONS.filter(combo => {
    const [a, b, c] = combo;

    return newBoard[a]
      && newBoard[a] === newBoard[b]
      && newBoard[b]
      && newBoard[b] === newBoard[c]
  })
  console.log('WINNING POSITIONS', winningPositions)
  // Check if no empty cells left
  if (!winningPositions.length && newBoard.every(cell => !!cell)) {
    return { endGame: true, isDraw: true };
  }

  return { endGame: winningPositions.length > 0 };
}

export const GET_RANDOM = max => {
  return Math.floor(Math.random() * max)
}

export const GET_ALLOWED_CELLS = board => {
  return board.map((cell, i) => !cell ? i : null).filter(cell => cell !== null);
}

export const CREATE_BOARD_ROW = (board, row) => {
  const [a, b, c] = row;
  return [
    board[a],
    board[b],
    board[c],
  ]
}