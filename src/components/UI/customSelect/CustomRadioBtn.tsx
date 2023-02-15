import React from 'react';
import styles from './customRadioBtn.module.scss';

interface CustomRadioBtnProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: 'radio';
  children: JSX.Element[];
}

export const CustomRadioBtn: React.FC<CustomRadioBtnProps> = ({ children, label }) => {
  return (
    <div>
      <label className={styles.customRadioBtn}>
        <div>{label}</div>
        <ul>
          {children.map(el => (
            <li key={el.key}>{el}</li>
          ))}
        </ul>
      </label>
    </div>
  );
};
