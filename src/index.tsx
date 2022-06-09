import type { NetlessApp } from "@netless/window-manager";

import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/App";
import styles from "./style.css?inline";

const TicTacToe: NetlessApp = {
  config: {
    minwidth: 0.01,
    minheight: 0.01,
    width: (9 / 16) * 0.5,
    height: 0.5,
  },
  kind: "TicTacToe",
  setup(context) {
    const box = context.getBox();

    // @todo
    box._fixRatio$.setValue(true);

    box.mountStyles(styles);

    const $content = document.createElement("div");
    $content.className = "tic-tac-toe";
    box.mountContent($content);

    const root = createRoot($content);
    root.render(<App context={context} />);

    context.emitter.on("destroy", () => {
      root.unmount();
    });
  },
};

export default TicTacToe;
