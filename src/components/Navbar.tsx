import { Layout, Menu, Row, message } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { logout } from '../store/reducers/auth';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();

  const { isAuthenticated, user } = useAppSelector(state => state.auth);
  const username = user?.username;

  const handleLogout = async () => {
    const result = await dispatch(logout());
    if (logout.fulfilled.match(result)) {
      message.success('Successfully logged out!');
    } else {
      message.error('An error occurred during logout!');
    }
  };

  return (
    <Layout.Header>
      <Row justify="end">
        <Menu mode="horizontal" theme="dark" selectable >
          {isAuthenticated &&
            <>
              <span key={'welcome_'+ username} style={{ color: 'white' }}>
                Welcome!, {username}
              </span>
              <Menu.Item key="1">
                <Link to="/" >
                    News 
                  </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/event" >
                  Event 
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
              <Link to="/counter" >
                  Counter 
                </Link>
              </Menu.Item>
              <Menu.Item key="0" onClick={() => handleLogout()}>
                Logout
              </Menu.Item>
            </>
          }
        </Menu>

      </Row>
    </Layout.Header>
  );
};

export default Navbar;