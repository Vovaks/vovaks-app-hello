import React, { FC, useEffect } from 'react';
import AppRouter from './components/AppRouter';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import { useActions } from './hooks/useActions';
import './App.scss';
import { IUser } from './models/IUser';

const App: FC = () => {

  const { setUser, setAuth } = useActions();


  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (auth) { //TODO: check token from server, and set params
      setAuth(true);
      setUser({username: localStorage.getItem('username') || ''} as IUser);
    }
  }, []);

  return (
    <Layout className='h100'>
      <Navbar />
      <Layout.Content className='app-container'>
        <AppRouter />
      </Layout.Content>
    </Layout>
  );
}

export default App;
