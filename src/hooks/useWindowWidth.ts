import { useLayoutEffect, useState } from "react";
import debounce from "lodash.debounce";

export function useWindowWidth() {
  const [size, setSize] = useState(0);

  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    const updateWidth = debounce(updateSize, 50);
    window.addEventListener("resize", updateWidth);
    updateWidth();
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return size;
}
