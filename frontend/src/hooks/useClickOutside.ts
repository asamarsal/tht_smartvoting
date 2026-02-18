import { useEffect, useRef } from "react";

export const useClickOutside = (
  callback: () => void,
  excludeRefs: React.RefObject<HTMLElement>[] = [],
) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        // Check if click is in any excluded refs
        const isExcluded = excludeRefs.some(
          (excludeRef) =>
            excludeRef.current &&
            excludeRef.current.contains(event.target as Node),
        );

        if (!isExcluded) {
          callback();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback, excludeRefs]);

  return ref;
};
