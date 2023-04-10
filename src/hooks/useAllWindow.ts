import {SyntheticEvent, useCallback, useEffect, useState} from "react";
import {useEvent} from "./useEvent";

export interface WindowSize {
  width: number;
  height: number;
}

export const useWindowSize = (cb: (size: WindowSize) => void) => {
  const onResize = useCallback((event: Event) => {
    const target = event.target as Window;
    if (!target) return;
    cb({width: target.innerWidth, height: target.innerHeight});
  }, []);

  useEvent("resize", onResize);

  useEffect(() => {
    cb({width: window.innerWidth, height: window.innerHeight});
  }, [])

};
