import React from 'react';
import {routes} from '../config/navbar';
import {Link} from 'react-router-dom';
import {useLoggedIn} from '../hooks/useLogin';
import {useMethodService} from '../services/useMethod';

export const Navbar = () => {
  const [isLoggedIn] = useLoggedIn();

  const logout = () => {
    useMethodService('frappe.handler.logout').then(() => {
      window.location.reload();
    });
  };

  return (
    <nav className="bg-gray-800 text-white py-3 px-4 flex items-center justify-between">
      <Link
        className="font-bold text-xl tracking-tight"
        to={isLoggedIn === 'LOGIN' ? '/jobs' : '/'}
      >
        RtCamp Assignmet
      </Link>
      {isLoggedIn === 'LOGIN' && (
        <div className="flex items-center">
          {routes.map(each => (
            <Link
              className="text-sm font-bold px-4 py-2 leading-none rounded-full hover:bg-gray-700"
              to={each.route}
            >
              {each.name}
            </Link>
          ))}

          <div
            className="text-sm font-bold px-4 py-2 leading-none rounded-full hover:bg-gray-700"
            onClick={logout}
          >
            Logout
          </div>
        </div>
      )}
    </nav>
  );
};
