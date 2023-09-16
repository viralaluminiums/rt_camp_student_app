import React from 'react';
import {useLoggedIn} from '../hooks/useLogin';
import {Navbar} from '../components/navbar';
import {Props} from '../types';

/**
 * Public Layout
 * Makes Public Views Unaccessible
 * like login and signUp pages
 */
export const PublicLayout: React.FC<Props> = ({children}) => {
  useLoggedIn('LOGIN', '/jobs');

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
