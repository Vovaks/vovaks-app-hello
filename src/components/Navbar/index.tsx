import React from 'react'
import { Layout, Menu, message, Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { logout } from '../../store/reducers/auth'
import { LogoutOutlined } from '@ant-design/icons'

import './Navbar.scss'

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const username = user?.username

  const handleLogout = async () => {
    const result = await dispatch(logout())
    if (logout.fulfilled.match(result)) {
      message.success('Successfully logged out!')
    } else {
      message.error('An error occurred during logout!')
    }
  }

  const menuItems = [
    { key: '1', label: <Link to='/'>News</Link> },
    { key: '2', label: <Link to='/event'>Event</Link> },
    { key: '3', label: <Link to='/counter'>Counter</Link> },
    { key: '4', label: <Link to='/pokemon'>Pokemon</Link> },
  ]

  return (
    <Layout.Header className={'navbar-header'}>
      <div className='navbar-left'>
        <Menu mode='horizontal' theme='dark' items={menuItems} className={'navbar-menu'} />
      </div>
      <div className='navbar-right'>
        <span className={'navbar-welcome'}>Welcome, {username}</span>
        <Tooltip placement='bottomRight' title='Logout'>
          <LogoutOutlined
            onClick={handleLogout}
            className={'navbar-logout-icon'}
            aria-label='Logout'
          />
        </Tooltip>
      </div>
    </Layout.Header>
  )
}

export default Navbar
