import React, { FC } from "react";
import { Circle, Cross } from "./Icons";

export interface BoardProps {
  board: ("o" | "x" | "")[][];
  readonly: boolean;
  onClick: (row: number, col: number) => void;
}

export const Board: FC<BoardProps> = ({ board, readonly, onClick }) => {
  return (
    <div className={`ttt-board ${readonly ? "is-readonly" : ""}`}>
      {board.map((line, row) =>
        line.map((value, col) => (
          <div
            className={`ttt-board-cell ${value ? "is-taken" : ""}`}
            key={`${row}-${col}`}
            onClick={() => {
              if (!readonly && !value) {
                onClick(row, col);
              }
            }}
          >
            {value === "o" ? Circle() : value === "x" ? Cross() : ""}
          </div>
        ))
      )}
    </div>
  );
};
