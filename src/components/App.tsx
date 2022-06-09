import React, { useState } from "react";
import type { AppContext } from "@netless/window-manager";
import {
  MemberIDType,
  useMembers,
  useMemberID,
  useStorage,
  useWritable,
} from "./hooks";
import { Board, BoardProps } from "./Board";
import { useMemo } from "react";
import { verdict } from "./utils";
import { useEffect } from "react";
import { Winner } from "./Winner";
import { Login } from "./Login";

export interface SyncState {
  board: BoardProps["board"];
  xPlayer: MemberIDType | null;
  oPlayer: MemberIDType | null;
  turn: "x" | "o";
}

export interface AppProps {
  context: AppContext;
}

export function App({ context }: AppProps) {
  const [syncState, setSyncState] = useStorage<SyncState>(
    context,
    "tic-tac-toe",
    () => ({
      board: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      xPlayer: null,
      oPlayer: null,
      turn: "o",
    })
  );

  const writable = useWritable(context);
  const members = useMembers(context);
  const memberID = useMemberID(context);

  const winner = useMemo(() => {
    const result = verdict(syncState.board);
    if (!result) {
      return null;
    }
    return result === "o" ? syncState.oPlayer : syncState.xPlayer;
  }, [syncState]);

  const readonly = useMemo(() => {
    if (!writable) {
      return true;
    }
    if (syncState.oPlayer && syncState.oPlayer === memberID) {
      return syncState.turn !== "o";
    }
    if (syncState.xPlayer && syncState.xPlayer === memberID) {
      return syncState.turn !== "x";
    }
    return Boolean(syncState.oPlayer && syncState.xPlayer);
  }, [
    syncState.oPlayer,
    syncState.xPlayer,
    syncState.turn,
    memberID,
    writable,
  ]);

  const isShowLogin = useMemo(() => {
    if (!writable) {
      return false;
    }
    if (syncState.oPlayer === memberID || syncState.xPlayer === memberID) {
      return false;
    }
    return !syncState.oPlayer || !syncState.xPlayer;
  }, [syncState.xPlayer, syncState.oPlayer, memberID, writable]);

  // useEffect(() => {
  //   if (
  //     syncState.oPlayer &&
  //     syncState.oPlayer !== memberID &&
  //     members.every((id) => id !== syncState.oPlayer)
  //   ) {
  //     setSyncState({ oPlayer: null });
  //   }
  //   if (
  //     syncState.xPlayer &&
  //     syncState.xPlayer !== memberID &&
  //     members.every((id) => id !== syncState.xPlayer)
  //   ) {
  //     setSyncState({ xPlayer: null });
  //   }
  // }, [members]);

  return (
    <div className="tic-tac-toe">
      <Board
        board={syncState.board}
        readonly={readonly}
        onClick={(row, col) => {
          if (!readonly) {
            const newBoard: SyncState["board"] = JSON.parse(
              JSON.stringify(syncState.board)
            );
            newBoard[row][col] = syncState.turn;
            setSyncState({
              board: newBoard,
              turn: syncState.turn === "x" ? "o" : "x",
            });
          }
        }}
      />
      {isShowLogin && (
        <Login
          onLogin={() => {
            if (!syncState.oPlayer) {
              setSyncState({ oPlayer: memberID });
            } else if (!syncState.xPlayer) {
              setSyncState({ xPlayer: memberID });
            }
          }}
        />
      )}
      {winner !== null && <Winner memberID={memberID} winner={winner} />}
    </div>
  );
}
