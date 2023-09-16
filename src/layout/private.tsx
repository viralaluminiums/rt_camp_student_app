import React, {ReactNode} from 'react';
import {useLoggedIn} from '../hooks/useLogin';
import {Navbar} from '../components/navbar';

interface Props {
  children?: ReactNode;
}

/**
 * Private Layout for Logged In Views
 */
export const PrivateLayout: React.FC<Props> = ({children}) => {
  useLoggedIn('LOGOUT', '/');

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
