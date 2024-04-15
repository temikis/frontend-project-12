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
import SignUp from './SignUp/SignUp.jsx';
import routes from '../utils/routes.js';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.root()} element={<Layout />}>
        <Route
          index
          element={(
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          )}
        />
        <Route path={routes.loginPage()} element={<LoginPage />} />
        <Route path={routes.signupPage()} element={<SignUp />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
