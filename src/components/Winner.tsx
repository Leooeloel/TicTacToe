import React from "react";
import { FC } from "react";

export interface WinnerProps {
  memberID: number;
  winner: number | null;
  loser: number | null;
}

export const Winner: FC<WinnerProps> = ({ memberID, winner, loser }) => {
  if (!winner && !loser) {
    return null;
  }
  return (
    <div className="ttt-winner">
      {memberID === winner
        ? "You Win!"
        : memberID === loser
        ? "You Lose!"
        : `${winner} Wins!`}
    </div>
  );
};
