import { IDefaultValuesRegistration } from '../models/types';

export const validate = (values: IDefaultValuesRegistration) => {
  const errors = {} as IDefaultValuesRegistration;

  const phoneRegex = '^[+]{0,1}380([0-9]{9})$';
  const emailRegex =
    /^(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

  if (!values.name) {
    errors.name = 'required';
  } else if (values.name.length < 2 || values.name.length > 60) {
    errors.name = 'min length - 2, max length - 60';
  }

  if (!values.email) {
    errors.email = 'required';
  } else if (values.email.length < 2 || values.email.length > 100) {
    errors.email = 'min length - 2, max length - 100';
  } else if (!values.email.match(emailRegex)) {
    errors.email = "email address isn't valid";
  }

  if (!values.phone) {
    errors.phone = 'required';
  } else if (!values.phone.match(phoneRegex)) {
    errors.phone = 'incorrect phone number';
  }

  if (!values.position_id) {
    errors.position_id = 'required';
  }

  if (!values.photo) {
    errors.photo = 'required';
  }

  return errors;
};
