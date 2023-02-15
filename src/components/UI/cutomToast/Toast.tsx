import React, { useState } from 'react';
import styles from './toast.module.scss';

interface ToastProps {
  open: boolean;
  children: React.ReactNode;
  error: boolean;
}

export const Toast: React.FC<ToastProps> = ({ children, open, error }) => {
  const [isShow, setIsShow] = useState(open);

  const visible = isShow ? styles.open : '';
  const isError = error ? styles.error : '';

  return (
    <div className={[styles.toast, visible, isError].join(' ')}>
      {children}
      <button onClick={() => setIsShow(false)}>x</button>
    </div>
  );
};
