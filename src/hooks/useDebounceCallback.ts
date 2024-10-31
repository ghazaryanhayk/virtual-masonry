import { useCallback, useRef } from "react";

export default function useDebouncedCallback(
  callback: (...args: never[]) => void,
  delay: number,
) {
  const callbackRef = useRef(callback);
  const timerRef = useRef<number>();

  return useCallback(
    (...args: never[]) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay],
  );
}
