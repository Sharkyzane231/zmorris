import { useState, useEffect, useRef } from "react";

export function useScrollHideTopbar() {
  const [hidden, setHidden] = useState(false);
  const lastScroll = useRef(0);

  useEffect(() => {
    const handler = () => {
      const current = window.scrollY;
      if (current > lastScroll.current && current > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScroll.current = current;
    };

    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return hidden;
}
