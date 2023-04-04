import React, { useRef, ChangeEvent } from 'react';
import styles from './customInput.module.scss';

interface ICustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  touched: { [field: string]: boolean };
  errors: { [field: string]: any };
  name: string;
  helperText?: string;
  value: string | undefined;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  inputElement: React.ReactNode;
}

export const CustomInput: React.FC<ICustomInputProps> = ({
  children,
  label,
  touched,
  errors,
  name,
  helperText,
  setFieldValue,
  inputElement,
  ...rest
}) => {
  const spanRef = useRef<HTMLSpanElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | string) => {
    if (typeof e === 'string') {
      if (e) {
        spanRef.current!.style.display = 'block';
      } else {
        spanRef.current!.style.display = 'none';
      }

      setFieldValue(name, e);
    } else {
      if (e?.target?.value) {
        spanRef.current!.style.display = 'block';
      } else {
        spanRef.current!.style.display = 'none';
      }

      setFieldValue(name, e.target.value);
    }
  };

  const isError = touched[name] && errors[name];

  return (
    <div className={`${styles.customInput} ${isError ? styles.error : ''}`}>
      <div className={styles.inputField}>
        <span className={styles.label} ref={spanRef}>
          {label}
        </span>
        {React.isValidElement(inputElement) &&
          React.cloneElement(inputElement, {
            onChange: handleChange,
            placeholder: label,
            ...rest,
          })}
      </div>
      {isError ? (
        <span className={[styles.descriptionError, styles.helperText].join(' ')}>
          {errors[name]}
        </span>
      ) : (
        <span className={styles.helperText}>{helperText}</span>
      )}
    </div>
  );
};
