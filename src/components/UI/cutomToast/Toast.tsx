import React, { useState, useEffect } from 'react';
import styles from './toast.module.scss';

interface ToastProps {
  open: boolean;
  children: React.ReactNode;
  error: boolean;
  handleClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ children, open, error, handleClose }) => {
  const [isShow, setIsShow] = useState(open);

  useEffect(() => {
    setIsShow(open);
  }, [open]);

  const visible = isShow ? styles.open : '';
  const isError = error ? styles.error : '';

  return (
    <div className={[styles.toast, visible, isError].join(' ')}>
      {children}
      <button onClick={handleClose}>x</button>
    </div>
  );
};
