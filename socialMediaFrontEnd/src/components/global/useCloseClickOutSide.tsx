import { useEffect, type RefObject } from 'react';

interface CloseOutSide {
  ref: RefObject<HTMLDivElement | null>;
  closeFunction: () => void;
  expect?: RefObject<HTMLDivElement | null>;
}

function useCloseClickOutSide({ expect, ref, closeFunction }: CloseOutSide) {
  useEffect(
    function () {
      function clickOutisde(e: MouseEvent) {
        if (ref.current && e.target) {
          const isComponentPart = ref.current.contains(e.target as Node);
          if (isComponentPart) {
            return;
          }
          if (
            expect &&
            expect.current &&
            expect.current.contains(e.target as Node)
          ) {
            return;
          }
          if (!isComponentPart) {
            closeFunction();
          }
        }
      }
      document.addEventListener('mousedown', clickOutisde);
      return () => {
        document.removeEventListener('mousedown', clickOutisde);
      };
    },
    [closeFunction, ref]
  );

  return null;
}
export default useCloseClickOutSide;
