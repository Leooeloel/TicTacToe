import React from "react";
import { FC } from "react";

export interface LoginProps {
  onLogin: () => void;
}

export const Login: FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="ttt-login">
      <button className="ttt-login-start" onClick={onLogin}>
        Start
      </button>
    </div>
  );
};
