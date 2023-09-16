import React, {createRef} from 'react';
import {Link, useNavigate, useSearchParams} from 'react-router-dom';
import {Formik, Form, Field} from 'formik';
import {LoginSchema} from '../values/consts';
import {useMethodService} from '../services/useMethod';
import {Loading} from '../components';
import {ErrorResponse} from '../types/index';

export const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const errorRef = createRef<HTMLParagraphElement>();
  const navigate = useNavigate();
  const isSignUpSuccess = searchParams.get('message') === 'signup_success';

  return (
    <section className="py-26 bg-white">
      <div className="container px-4 mx-auto">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2">
              Sign in
            </h2>
          </div>

          {isSignUpSuccess && (
            <p className="text-green-500 text-center text-md mt-2 ">
              SignUp SuccessFull Please Login
            </p>
          )}
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={LoginSchema}
            onSubmit={async (values, FormikHelpers) => {
              FormikHelpers.setSubmitting(true);

              try {
                await useMethodService('login', {
                  usr: values.email,
                  pwd: values.password,
                });
                navigate('/jobs?message=signup_success');
              } catch (error) {
                const message = (error as ErrorResponse).response.data.message;
                if (errorRef.current) {
                  errorRef.current.innerText = message;
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
                <p className="text-red-500 text-md mt-2" ref={errorRef}></p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-block w-full py-4 px-6 mb-6 text-center text-lg leading-6 text-white font-extrabold bg-black hover:bg-gray-700 border-3 border-blac shadow rounded transition duration-200"
                >
                  {isSubmitting ? <Loading /> : 'Signin'}
                </button>
              </Form>
            )}
          </Formik>
          <p className="text-center font-extrabold">
            Dont have Account ?{' '}
            <Link to="/signup" className="text-indigo-500 hover:underline">
              Sigup
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};
