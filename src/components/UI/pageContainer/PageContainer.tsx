import React from 'react';
import styles from './pageContainer.module.scss';

interface PageContainerProps {
  children: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
