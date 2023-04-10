import React, { CSSProperties, PropsWithChildren } from "react";

interface CellProps {
  onClick: VoidFunction;
  style?: CSSProperties;
}

export const Cell = ({
  style,
  onClick,
  children,
}: PropsWithChildren<CellProps>) => {
  return (
    <div
      style={{
        ...style,
        background: "rgba(0,0,0, 0.8)",
        color: "white",
        border: "1px solid grey",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: "44px",
        fontSize: 36,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
