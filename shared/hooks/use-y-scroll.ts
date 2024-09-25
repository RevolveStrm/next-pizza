import React, { Ref }  from "react";

export const useYScroll = (ref: React.RefObject<HTMLDivElement>, marginY: number): void => {
  React.useEffect(() => {
    const handleHashChange = () => {
        if (!ref?.current?.id || !window.location.hash) {
          return;
        }

        const hash = decodeURIComponent(
          window.location.hash.replace('#', ''),
        );
        const element = ref.current as HTMLDivElement;
        const elementY: number = element.getBoundingClientRect().top;
        const windowY: number = window.scrollY;
        const y: number = elementY + windowY + marginY;

        if (element.id !== hash) {
          return;
        }

        window.scrollTo({ top: y, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);

    if (window.location.hash) {
        handleHashChange();
    }

    return () => {
        window.removeEventListener('hashchange', handleHashChange);
    };
  }, [ref, marginY]);
};