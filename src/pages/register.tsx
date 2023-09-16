import React, {createRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Formik, Form, Field} from 'formik';
import {RegisterSchema} from '../values/consts';
import {useMethodService} from '../services/useMethod';
import {Loading} from '../components';
import {ErrorResponse} from '../types';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const errorRef = createRef<HTMLParagraphElement>();

  return (
    <section className="py-24 bg-white">
      <div className="container px-4 mx-auto">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2">
              Sign Up
            </h2>
          </div>

          <Formik
            initialValues={{
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={RegisterSchema}
            onSubmit={async (values, {setErrors, setSubmitting}) => {
              if (values.password !== values.confirmPassword) {
                setErrors({
                  password: 'Password Did not match',
                  confirmPassword: 'Password Did not match',
                });
                return;
              }

              setSubmitting(true);

              try {
                await useMethodService(
                  'rtcamp_assignment.api.auth.register_candidate',
                  {
                    payload: values,
                  }
                );

                navigate('/?message=signup_success');
              } catch (error) {
                console.log(error);
                let message = JSON.parse(
                  (error as ErrorResponse).response.data._server_messages
                )[0];
                message = JSON.parse(message).message;
                console.log(message);
                if (errorRef.current) {
                  errorRef.current.innerHTML = message;
                }
              }
            }}
          >
            {({values, errors, touched, isSubmitting}) => (
              <Form>
                <div className="mb-6">
                  <label className="block mb-2 font-extrabold" htmlFor="email">
                    Email
                  </label>
                  <Field
                    className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-gray-600 bg-white shadow border-2 border-black rounded"
                    type="email"
                    name="email"
                    defaultValue={values.email}
                    placeholder="email"
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-md mt-2 ">{errors.email}</p>
                  )}
                </div>
                <div className="mb-6">
                  <label
                    className="block mb-2 font-extrabold"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <Field
                    className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-gray-600 bg-white shadow border-2 border-black rounded"
                    type="password"
                    name="password"
                    defaultValue={values.password}
                    placeholder="**********"
                  />
                  {errors.password && touched.password && (
                    <p className="text-red-500 text-md mt-2 ">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <label
                    className="block mb-2 font-extrabold"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>
                  <Field
                    className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-gray-600 bg-white shadow border-2 border-black rounded"
                    name="confirmPassword"
                    type="password"
                    defaultValue={values.confirmPassword}
                    placeholder="**********"
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="text-red-500 text-md mt-2 ">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <p className="text-red-500 text-md mt-2 " ref={errorRef}></p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-block w-full py-4 px-6 mb-6 text-center text-lg leading-6 text-white font-extrabold bg-black hover:bg-gray-700 border-3 border-blac shadow rounded transition duration-200"
                >
                  {isSubmitting ? <Loading /> : 'Register'}
                </button>
              </Form>
            )}
          </Formik>
          <p className="text-center font-extrabold">
            Already have Account ?{' '}
            <Link to="/" className="text-indigo-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};
