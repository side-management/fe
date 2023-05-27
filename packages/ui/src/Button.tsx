"use client";
import * as React from "react";

export const Button = ({
  children,
  leftSlot,
}: {
  children: React.ReactNode;
  leftSlot: React.ReactNode;
}) => {
  return (
    <button onClick={() => alert("boop")}>
      {leftSlot}
      <span>{children}</span>
    </button>
  );
};
