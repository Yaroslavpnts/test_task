import React, { useEffect, useState } from 'react';
import styles from './tooltip.module.scss';

interface TooltipProps {
  children: React.ReactNode;
  refProp: React.MutableRefObject<HTMLElement | null>;
  tooltipText: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ children, refProp, tooltipText }) => {
  const [isShow, setIsShow] = useState(false);

  const handlerEnter = (e: MouseEvent) => {
    setIsShow(true);
  };

  const handlerLeave = (e: MouseEvent) => {
    setIsShow(false);
  };

  useEffect(() => {
    const refElem = refProp.current;

    if (refElem) {
      refElem!.addEventListener('mouseenter', handlerEnter);
      refElem!.addEventListener('mouseleave', handlerLeave);

      return () => {
        refElem!.removeEventListener('mouseenter', handlerEnter);
        refElem!.removeEventListener('mouseleave', handlerLeave);
      };
    }

    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.tooltip}>
      {children}
      <span className={[styles.tooltipText, isShow ? styles.show : ''].join(' ')}>
        {tooltipText}
      </span>
    </div>
  );
};
