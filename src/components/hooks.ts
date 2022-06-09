import type { AppContext } from "@netless/window-manager";
import type { RoomState } from "white-web-sdk";
import { useEffect, useMemo, useState } from "react";

export type MemberIDType = number;

export function useWritable(context: AppContext) {
  const [writable, setWritable] = useState(() => context.getIsWritable());

  useEffect(() => {
    const update = () => setWritable(context.getIsWritable());
    context.emitter.on("writableChange", update);
    return () => context.emitter.off("writableChange", update);
  }, [context]);

  return writable;
}

export function useStorage<T>(
  context: AppContext,
  namespace: string,
  defaultState: () => T
): [T, (v: Partial<T>) => void] {
  const [storage] = useState(() =>
    context.createStorage<T>(namespace, defaultState())
  );
  const [state, _setState] = useState(storage.state);
  const setState = useMemo(() => storage.setState.bind(storage), [context]);

  useEffect(
    () =>
      storage.addStateChangedListener(() => {
        _setState({ ...storage.state });
      }),
    [storage]
  );

  return [state, setState];
}

export function useMembers(context: AppContext): MemberIDType[] {
  const [members, setMembers] = useState(() =>
    context.getDisplayer().state.roomMembers.map((memebr) => memebr.memberId)
  );

  useEffect(() => {
    const displayer = context.getDisplayer();
    const handler = (state: Partial<RoomState>) => {
      if (state.roomMembers) {
        setMembers(
          displayer.state.roomMembers.map((memebr) => memebr.memberId)
        );
      }
    };
    displayer.callbacks.on("onRoomStateChanged", handler);
    return () => {
      displayer.callbacks.off("onRoomStateChanged", handler);
    };
  }, [context]);

  return members;
}

export function useMemberID(context: AppContext): MemberIDType {
  return useMemo(() => context.getDisplayer().observerId, [context]);
}
