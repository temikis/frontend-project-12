import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Layout from './Layout.jsx';
import MainPage from './MainPage.jsx';
import LoginPage from './LoginPage/LoginPage.jsx';
import NotFoundPage from './NotFoundPage/NotFoundPage.jsx';
import PrivateRoute from './PrivateRoute.jsx';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={(
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          )}
        />
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
