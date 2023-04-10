import { useCallback } from "react";
import { useEvent } from "./useEvent";

export interface Position {
  x: number;
  y: number;
}

type ResizeCb = (position: Position) => void;

export const useResizeOnScroll = (cb: ResizeCb) => {
  const onScroll = useCallback(() => {
    cb({
      x: window.scrollX + window.innerWidth,
      y: window.scrollY + window.innerHeight,
    });
  }, [cb]);

  useEvent("scroll", onScroll);
};
