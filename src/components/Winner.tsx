import React from "react";
import { FC } from "react";

export interface WinnerProps {
  memberID: number;
  winner: number;
}

export const Winner: FC<WinnerProps> = ({ memberID, winner }) => {
  return (
    <div className="ttt-winner">
      {memberID === winner ? "You Win!" : `${winner} Wins!`}
    </div>
  );
};
