import React from 'react';
import styles from './button.module.scss';

export enum ButtonColors {
  YELLOW = 'YELLOW',
  GRAY = 'GRAY',
}

interface ICustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color: ButtonColors;
  refEl?: React.LegacyRef<HTMLButtonElement> | undefined;
}

export const CustomButton: React.FC<ICustomButtonProps> = ({
  children,
  color,
  refEl,
  ...props
}) => {
  return (
    <button
      ref={refEl}
      className={`${styles.btn} ${color === ButtonColors.YELLOW ? styles.yellow : styles.gray}`}
      {...props}
    >
      {children}
    </button>
  );
};
