import { WINNING_COMBINATIONS } from './constants';

export const CHECK_END_GAME = (newBoard) => {
  // Check if we have some winning position
  const isWinningCombo = WINNING_COMBINATIONS.map(combo => {
    const [a, b, c] = combo;

    return newBoard[a]
      && newBoard[a] === newBoard[b]
      && newBoard[b]
      && newBoard[b] === newBoard[c]
  })

  // Check if no empty cells left
  if (newBoard.every(cell => !!cell)) {
    return true;
  }

  return isWinningCombo.filter(combo => combo).length > 0;
}