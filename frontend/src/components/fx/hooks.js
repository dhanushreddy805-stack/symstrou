import { useEffect, useState } from "react";

export const useMedia = (query) => {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return match;
};

export const useIsDesktop = () => useMedia("(min-width: 1024px)");
export const useFinePointer = () => useMedia("(hover: hover) and (pointer: fine)");
