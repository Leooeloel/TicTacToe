export type BoardCell = "o" | "x" | "";

export function verdict(board: BoardCell[][]): BoardCell {
  let base: BoardCell;
  const rowCount = board.length;
  const colCount = board[0].length;

  // check rows
  for (let row = 0; row < rowCount; row++) {
    base = board[row][0];
    if (base) {
      for (let col = 1; col <= colCount; col++) {
        if (col === colCount) {
          return base;
        }
        if (base !== board[row][col]) {
          break;
        }
      }
    }
  }

  // check cols
  for (let col = 0; col < colCount; col++) {
    base = board[0][col];
    if (base) {
      for (let row = 1; row <= rowCount; row++) {
        if (row === rowCount) {
          return base;
        }
        if (base !== board[row][col]) {
          break;
        }
      }
    }
  }

  // check cross
  base = board[0][0];
  if (base) {
    for (let row = 1; row <= rowCount; row++) {
      if (row === rowCount) {
        return base;
      }
      if (row >= colCount || board[row][row] !== base) {
        break;
      }
    }
  }

  // check cross
  base = board[0][colCount - 1];
  if (base) {
    for (let row = 1; row <= rowCount; row++) {
      if (row === rowCount) {
        return base;
      }
      if (row >= colCount || board[row][colCount - row - 1] !== base) {
        break;
      }
    }
  }

  return "";
}
