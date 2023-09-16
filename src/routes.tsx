import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {routes} from './config/routes';

export const PageRouter = () => {
  return (
    <Routes>
      {routes.map(each => (
        <Route
          key={each.path.replace('/', '')}
          path={each.path}
          element={each.Page}
        />
      ))}
    </Routes>
  );
};
