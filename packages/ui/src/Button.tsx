"use client";

import { ReactNode } from "react";
import { buttonStyle } from "./Button.css";

export const Button = ({
  children,
  leftSlot,
}: {
  children: ReactNode;
  leftSlot: ReactNode;
}) => {
  return (
    <button onClick={() => alert("boop")} className={buttonStyle}>
      {leftSlot}
      <span>{children}</span>
    </button>
  );
};
