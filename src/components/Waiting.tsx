import React from "react";
import { FC } from "react";

export interface WaitingProps {}

export const Waiting: FC<WaitingProps> = () => {
  return <div className="ttt-waiting">Waiting for other players...</div>;
};
