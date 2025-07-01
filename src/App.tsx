import React, { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { Layout } from 'antd';
import { useActions } from './hooks/useActions';
import { IUser } from './models/IUser';

import './App.scss';

const App: FC = () => {
  const { setUser, setAuth } = useActions();
  const location = useLocation();
  const navigate = useNavigate();

  // Persist current path to localStorage whenever the route changes
  useEffect(() => {
    localStorage.setItem('lastPath', location.pathname);
  }, [location]);

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    const lastPath = localStorage.getItem('lastPath');
    if (auth) {
      // TODO: Check token validity with server and handle errors
      setAuth(true);
      setUser({ username: localStorage.getItem('username') || '' } as IUser);
    }
    if (lastPath && lastPath !== '/') {
      navigate(lastPath);
    }
  }, [setAuth, setUser, navigate]);

  return (
    <Layout className="h100">
      <Layout.Content className="app-container">
        <AppRouter />
      </Layout.Content>
    </Layout>
  );
};

export default App;