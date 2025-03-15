import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import { addContact } from '../../redux/contactsSlice';
import css from './ContactForm.module.css';

const ContactForm = () => {
  const dispatch = useDispatch();

  const contactValidation = Yup.object({
    name: Yup.string().min(3, 'Minimum 3 characters').max(50, 'Maximum 50 characters').required('Fill in the field'),
    number: Yup.string().min(3, 'Minimum 3 characters').max(50, 'Maximum 50 characters').required('Fill in the field'),
  });

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={contactValidation}
      onSubmit={(values, { resetForm }) => {
        dispatch(addContact({ id: nanoid(), ...values }));
        resetForm();
      }}
    >
      {() => (
        <Form>
          <div className={css.form}>
            <label className={css.label} htmlFor="name">Name</label>
            <Field className={css.field} name="name" type="text" />
            <ErrorMessage name="name" />
          </div>
          <div className={css.form}>
            <label className={css.label} htmlFor="number">Number</label>
            <Field className={css.field} name="number" type="text" />
            <ErrorMessage name="number" />
          </div>
          <button className={css.button} type="submit">Add Contact</button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
