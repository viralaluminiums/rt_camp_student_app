import React from 'react';
import {
  JobList,
  JobSingleList,
  LoginPage,
  ProfilePage,
  RegisterPage,
} from '../pages';
import {PrivateLayout} from '../layout/private';
import {PublicLayout} from '../layout/public';
import {RouteType} from '../types';

export const routes = [
  {
    path: '/jobs',
    type: 'private' as RouteType,
    Page: (
      <PrivateLayout>
        <JobList />
      </PrivateLayout>
    ),
  },

  {
    path: '/job/:job',
    type: 'private' as RouteType,
    Page: (
      <PrivateLayout>
        <JobSingleList />
      </PrivateLayout>
    ),
  },
  {
    path: '/',
    type: 'public' as RouteType,
    Page: (
      <PublicLayout>
        <LoginPage />
      </PublicLayout>
    ),
  },

  {
    path: '/signup',
    type: 'public' as RouteType,
    Page: (
      <PublicLayout>
        <RegisterPage />
      </PublicLayout>
    ),
  },

  {
    path: '/account',
    type: 'private' as RouteType,
    Page: (
      <PrivateLayout>
        <ProfilePage />
      </PrivateLayout>
    ),
  },
];
