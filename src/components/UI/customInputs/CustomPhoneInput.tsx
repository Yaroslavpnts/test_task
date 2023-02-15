import { E164Number } from 'libphonenumber-js/types';
import React, { useRef } from 'react';
import PhoneInput from 'react-phone-number-input/input';
import styles from './customInput.module.scss';

interface IPhoneNumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  helperText?: string;
  label: string;
  name: string;
  value: E164Number | undefined;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  touched: { [field: string]: boolean };
  errors: { [field: string]: any };
  setErrors: (fields: { [field: string]: string }) => void;
}

export const CustomPhoneNumberInput: React.FC<IPhoneNumberInputProps> = ({
  helperText,
  label,
  onChange,
  name,
  setFieldValue,
  value,
  touched,
  errors,
  setErrors,
  ...rest
}) => {
  const spanRef = useRef<HTMLSpanElement>(null);

  const handleChange = (value?: E164Number | undefined) => {
    if (value) {
      spanRef.current!.style.left = '12px';
      spanRef.current!.style.top = '-8px';
      spanRef.current!.style.fontSize = '12px';
      spanRef.current!.style.lineHeight = '14px';
    } else {
      spanRef.current!.style.left = '16px';
      spanRef.current!.style.top = '14px';
      spanRef.current!.style.fontSize = 'inherit';
      spanRef.current!.style.lineHeight = 'inherit';
    }

    setFieldValue(name, value);
  };

  const isError = touched[name] && errors[name];

  return (
    <div className={`${styles.customInput} ${isError ? styles.error : ''}`}>
      <div>
        <span ref={spanRef}>{label}</span>
        <PhoneInput
          {...rest}
          name={name}
          country="UA"
          value={value}
          onChange={handleChange}
          maxLength={12}
        />
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
