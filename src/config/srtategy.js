export const CORNER_CELLS = [0, 2, 6, 8];
export const CENTER_CELL = 4;

// Amount of empty cells left after each move
export const FIRST_MOVE = 1;
export const SECOND_MOVE = 2;
export const THIRD_MOVE = 3;

export const GET_MOVE_COUNT = (board, robotPlayer) => {
  const filledCells = board.filter(cell => cell === robotPlayer)
  return filledCells.length + 1;
}
