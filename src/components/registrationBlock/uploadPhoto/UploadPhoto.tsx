import React, { useState } from 'react';
import styles from './uploadPhoto.module.scss';

interface UploadPhotoProps {
  setFieldValue: (field: string, value: File | Blob) => void;
  setFieldError: (field: string, value: string | undefined) => void;
  name: string;
  touched: { [field: string]: boolean };
  errors: { [field: string]: any };
  value: string | File;
  onBlur: (e: any) => void;
}

export const UploadPhoto: React.FC<UploadPhotoProps> = ({
  setFieldValue,
  setFieldError,
  name,
  value,
  touched,
  errors,
  ...rest
}) => {
  const [fileName, setFileName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    if (file.size / 1024 / 1024 > 5) {
      setFieldError(name, 'Photo must not be higher than 5mb size');
      return;
    }

    setFieldValue(name, file);

    setFileName(file.name);
  };

  /* added "fake" function only for disable warning: 
  "You provided a `value` prop to a form field without an `onChange` handler"
  */
  const fake = () => {};

  const isError = touched[name] && errors[name];

  return (
    <div className={`${styles.uploadPhoto} ${isError ? styles.error : ''}`}>
      <div>
        <label>
          <input type="file" {...rest} onChange={handleChange} accept=" image/jpeg" />
          <span>Upload</span>
        </label>
        <input value={fileName} placeholder="Upload your photo" onChange={fake} />
      </div>

      {isError ? (
        <span className={[styles.descriptionError, styles.helperText].join(' ')}>
          {errors[name]}
        </span>
      ) : null}
    </div>
  );
};
