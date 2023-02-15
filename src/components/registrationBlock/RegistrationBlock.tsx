import React, { useEffect, useState } from 'react';
import { api } from '../../api/apiMethods';
import { useFormik } from 'formik';
import { CustomInput } from '../UI/customInputs/CustomInput';
import { CustomPhoneNumberInput } from '../UI/customInputs/CustomPhoneInput';
import { CustomRadioBtn } from '../UI/customSelect/CustomRadioBtn';
import styles from './registrationBlock.module.scss';
import { IDefaultValuesRegistration, IPosition } from '../../models/types';
import { UploadPhoto } from './uploadPhoto/UploadPhoto';
import { ButtonColors, CustomButton } from '../UI/customButton/CustomButton';
import { validate } from '../../utils/validators';
import { useAppDispatch } from '../../app/hooks';
import { getUsersAsync } from '../../redux/usersSlice/usersSlice';
import SuccessImg from '../../Assets/success-image.svg';
import { Toast } from '../UI/cutomToast/Toast';

const initialValues: IDefaultValuesRegistration = {
  name: '',
  email: '',
  phone: undefined,
  position_id: '',
  photo: '',
};

export const RegistrationBlock: React.FC = () => {
  const dispatch = useAppDispatch();

  const [positions, setPositions] = useState<IPosition[]>([]);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async (values, { resetForm }) => {
      try {
        const { data } = await api.registrateUser(values);

        resetForm();

        setSuccess(true);
        window.scrollTo(0, document.body.scrollHeight);

        if (data.success) {
          dispatch(getUsersAsync({ page: 1, count: 6, onlyLast: true }));
        }
      } catch (error) {}
    },
  });

  useEffect(() => {
    const loadPositions = async () => {
      try {
        const {
          data: { positions },
        } = await api.getPositions();

        setPositions(positions);

        formik.setFieldValue('position_id', positions[0].id.toString());
      } catch (error) {
        const { message } = error as { message: string };

        setErrorMessage(message);
      }
    };

    loadPositions();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <h1 id="signUp">Working with POST request</h1>
      <form onSubmit={formik.handleSubmit} className={styles.registrationBlock}>
        <CustomInput
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          label="Your name"
          errors={formik.errors}
          touched={formik.touched}
          onBlur={formik.handleBlur}
        />
        <CustomInput
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          label="Email"
          errors={formik.errors}
          touched={formik.touched}
          onBlur={formik.handleBlur}
        />
        <CustomPhoneNumberInput
          name="phone"
          type="tel"
          value={formik.values.phone}
          onChange={formik.handleChange}
          label="Phone"
          setFieldValue={formik.setFieldValue}
          setErrors={formik.setErrors}
          errors={formik.errors}
          touched={formik.touched}
          onBlur={formik.handleBlur}
          helperText="+38 (XXX) XXX - XX - XX"
        />
        <CustomRadioBtn label="Select your position">
          {positions.map(pos => (
            <div key={pos.id}>
              <input
                type="radio"
                name="position_id"
                value={pos.id}
                id={pos.id.toString()}
                checked={pos.id.toString() === formik.values.position_id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor={pos.id.toString()}>{pos.name}</label>
            </div>
          ))}
        </CustomRadioBtn>
        <UploadPhoto
          name="photo"
          value={formik.values.photo}
          setFieldValue={formik.setFieldValue}
          setFieldError={formik.setFieldError}
          errors={formik.errors}
          touched={formik.touched}
          onBlur={formik.handleBlur}
        />
        <CustomButton color={ButtonColors.GRAY} type="submit">
          Sign up
        </CustomButton>

        <Toast open={!!errorMessage} error={!!errorMessage}>
          {errorMessage}
        </Toast>
      </form>
      {success && (
        <div className={styles.successRegistration}>
          <h1>User successfully registered</h1>
          <div>
            <img src={SuccessImg} alt="success-registration-logo" />
          </div>
        </div>
      )}
    </>
  );
};
