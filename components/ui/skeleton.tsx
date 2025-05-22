import React from "react";
import clsx from "clsx";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "skeleton rounded-md bg-muted animate-shimmer",
        className
      )}
    />
  );
}
