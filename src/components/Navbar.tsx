import { Layout, Menu, Row, Col, message } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { logout } from '../store/reducers/auth';

import { LogoutOutlined } from '@ant-design/icons';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector(state => state.auth);
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
      <Row justify="end" >
        <Col span={6}>
          <Menu mode="horizontal" theme="dark" selectable >
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
            <Menu.Item key="4">
              <Link to="/pokemon" >
                Pokemon
              </Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={3}>
          <span key={'welcome_' + username} className="navbar-welcome">
            Welcome!, {username} <LogoutOutlined onClick={() => handleLogout()} />
          </span>
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default Navbar;