import React, {createRef} from 'react';
import {Formik, Form, Field} from 'formik';
import {useMethodService} from '../services/useMethod';
import {ProfileSchema} from '../values/consts';
import {ErrorResponse, Profile} from '../types';
import {Loading} from '../components';

export const ProfilePage = () => {
  const [editMode, setEditMode] = React.useState(false);
  const [headerMessage, setHeaderMessage] = React.useState('');
  const [cvFile, setCvFile] = React.useState<File>();
  const [profile, setProfile] = React.useState<Profile>();
  const errorRef = createRef<HTMLParagraphElement>();

  React.useEffect(() => {
    useMethodService('rtcamp_assignment.api.profile.get_profile')
      .then(resp => {
        setProfile(resp.data.message);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const inputHTMLClass = `w-full py-3 ${
    editMode ? 'border border-slate-200' : ''
  } rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100`;

  return (
    <div className="w-max mx-auto mt-20 px-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-black dark:text-gray-300 pb-2">
          Account settings:
        </h2>
        <button
          onClick={() => setEditMode(prev => !prev)}
          className="inline-block w-max py-2 mt-4 px-6 mb-6 text-center text-lg leading-6 text-black underline font-extrabold   rounded transition duration-200"
        >
          {editMode ? 'Cancel' : 'Edit'}
        </button>
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          full_name: profile?.full_name ?? '',
          contact: profile?.contact || '',
          date_of_birth: profile?.date_of_birth || '',
          cgpa: profile?.cgpa || '',
          address: profile?.address || '',
          gender: profile?.gender || '',
        }}
        validationSchema={ProfileSchema}
        onSubmit={async (values, formikHelpers) => {
          formikHelpers.setSubmitting(true);

          let payload = values;
          if (cvFile) {
            const formData = new FormData();
            formData.append('file', cvFile);
            formData.append('is_private', '1');
            const file = await useMethodService('upload_file', formData);
            payload = {...values, resume: file.data.message.file_url};
          }

          try {
            await useMethodService(
              'rtcamp_assignment.api.profile.update_profile',
              {
                payload: payload,
              }
            );
            setHeaderMessage('Your Profile Updated SuccessFully');
            formikHelpers.setSubmitting(false);
            setEditMode(false);
          } catch (error) {
            formikHelpers.setSubmitting(false);
            let message = JSON.parse(
              (error as ErrorResponse).response.data._server_messages
            )[0];
            message = JSON.parse(message).message;
            if (errorRef.current) {
              errorRef.current.innerText = message;
            }
          }
        }}
      >
        {({errors, touched, isSubmitting}) => (
          <Form className="max-w-2xl">
            {headerMessage && (
              <p className="text-green-500 text-md mt-2 ">{headerMessage}</p>
            )}

            <div className="flex flex-wrap border shadow rounded-lg p-3 dark:bg-gray-600">
              <div className="flex flex-col gap-2 w-full border-gray-400">
                <div>
                  <label className="text-gray-600 dark:text-gray-400">
                    Full Name
                  </label>
                  <Field
                    className={inputHTMLClass}
                    disabled={!editMode}
                    name="full_name"
                    type="text"
                  />
                </div>

                {errors.full_name && (
                  <p className="text-red-500 text-md mt-2 ">
                    {errors.full_name}
                  </p>
                )}

                <div>
                  <label className="text-gray-600 dark:text-gray-400">
                    Contact
                  </label>
                  <Field
                    disabled={!editMode}
                    name="contact"
                    className={inputHTMLClass}
                    type="tel"
                  />
                </div>
                {errors.contact && touched.contact && (
                  <p className="text-red-500 text-md mt-2 ">{errors.contact}</p>
                )}

                {profile && profile.resume && !editMode ? (
                  <>
                    <a
                      target="_blank"
                      className="font-xl font-bold underline"
                      href={profile.resume}
                    >
                      Download Your CV
                    </a>
                  </>
                ) : (
                  <div>
                    <label className="text-gray-600 dark:text-gray-400">
                      CV
                    </label>
                    <Field
                      disabled={!editMode}
                      name="cv"
                      className={inputHTMLClass}
                      type="file"
                      onChange={(event: React.FormEvent<HTMLInputElement>) => {
                        if (event.currentTarget.files) {
                          setCvFile(event.currentTarget.files[0]);
                        }
                      }}
                    />
                  </div>
                )}

                <div>
                  <label className="text-gray-600 dark:text-gray-400">
                    Date of Birth
                  </label>
                  <Field
                    disabled={!editMode}
                    name="date_of_birth"
                    className={inputHTMLClass}
                    type="date"
                  />
                </div>
                {errors.date_of_birth && touched.date_of_birth && (
                  <p className="text-red-500 text-md mt-2 ">
                    {errors.date_of_birth}
                  </p>
                )}

                <div>
                  <label className="text-gray-600 dark:text-gray-400">
                    CGPA
                  </label>
                  <Field
                    disabled={!editMode}
                    name="cgpa"
                    className={inputHTMLClass}
                    type="number"
                  />
                </div>
                {errors.cgpa && touched.cgpa && (
                  <p className="text-red-500 text-md mt-2 ">{errors.cgpa}</p>
                )}

                <div>
                  <label className="text-gray-600 dark:text-gray-400">
                    Address
                  </label>
                  <Field
                    as="textarea"
                    disabled={!editMode}
                    name="address"
                    className={inputHTMLClass}
                    type="text"
                  />
                </div>
                {errors.address && touched.address && (
                  <p className="text-red-500 text-md mt-2 ">{errors.address}</p>
                )}

                <div>
                  <label className="text-gray-600 dark:text-gray-400">
                    Gender
                  </label>

                  <Field
                    as="select"
                    disabled={!editMode}
                    className={inputHTMLClass}
                    name="gender"
                    id="gender"
                  >
                    <option></option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Opt Not to Specify">
                      Prefer not to Specify
                    </option>
                  </Field>

                  {errors.gender && touched.gender && (
                    <p className="text-red-500 text-md mt-2 ">
                      {errors.gender}
                    </p>
                  )}
                </div>

                <p className="text-red-500 text-md mt-2" ref={errorRef}></p>

                {editMode && (
                  <div className="flex justify-end">
                    <button
                      className="py-1.5 px-3 m-1 text-center bg-black border rounded-md text-white  hover:bg-gray-600 hover:text-gray-100 dark:text-gray-200 dark:bg-violet-700"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? <Loading /> : 'Save Changes'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
