import React from 'react';
import styles from './button.module.scss';

export enum ButtonColors {
  YELLOW = 'YELLOW',
  GRAY = 'GRAY',
}

interface ICustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color: ButtonColors;
}

export const CustomButton: React.FC<ICustomButtonProps> = ({ children, color, ...props }) => {
  return (
    <button
      className={`${styles.btn} ${color === ButtonColors.YELLOW ? styles.yellow : styles.gray}`}
      {...props}
    >
      {children}
    </button>
  );
};
