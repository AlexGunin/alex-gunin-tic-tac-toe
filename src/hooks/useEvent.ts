import { useEffect } from "react";

type EventName = keyof DocumentEventMap;
type EventCallback = (e: Event) => void;
type EventOptions = AddEventListenerOptions | boolean;

export const useEvent = (
  event: EventName,
  cb: EventCallback,
  options?: EventOptions
) => {
  useEffect(() => {
    window.addEventListener(event, cb, options);
    return () => {
      window.removeEventListener(event, cb);
    };
  }, [cb]);
};
