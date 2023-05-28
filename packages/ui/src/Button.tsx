"use client";

import { ReactNode } from "react";

export const Button = ({
  children,
  leftSlot,
}: {
  children: ReactNode;
  leftSlot: ReactNode;
}) => {
  return (
    <button onClick={() => alert("boop")}>
      {leftSlot}
      <span>{children}</span>
    </button>
  );
};
