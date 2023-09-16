import * as React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {PageRouter} from './routes';

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <PageRouter />
      </BrowserRouter>
    </>
  );
};
