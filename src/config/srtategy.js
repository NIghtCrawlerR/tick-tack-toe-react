export const CORNER_CELLS = [0, 2, 6, 8];
export const CENTER_CELL = 4;

export const FIRST_MOVE = 1;
export const SECOND_MOVE = 2;
export const THIRD_MOVE = 3;

export const GET_MOVE_COUNT = (board, robotPlayer) => {
  const filledCells = board.filter(cell => cell === robotPlayer)
  return filledCells.length + 1;
}

// Define best move for possible humans position
export const POSSIBLE_HUMANS_POSITIONS = [
  {
    positions: [3, 6, 7],
    bestMove: 2,
  }, {
    positions: [1, 2, 5],
    bestMove: 6,
  }, {
    positions: [0, 1, 3],
    bestMove: 8,
  }, {
    positions: [5, 7, 8],
    bestMove: 0,
  }
];

export const ALLOWED_CORNERS = board => {
  const allowed = [];

  board.map((cell, i) => {
    if (!cell && CORNER_CELLS.includes(i)) allowed.push(i);
    return cell;
  })

  return allowed;
};