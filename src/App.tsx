import React, { FC, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import { Layout } from 'antd'
import { publicRoutes } from './router'

import './App.scss'

const App: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const publicPaths = publicRoutes.map((route) => route.path)

    if (!publicPaths.includes(location.pathname)) {
      localStorage.setItem('lastPath', location.pathname)
    }
  }, [location])

  useEffect(() => {
    const auth = localStorage.getItem('auth')
    const lastPath = localStorage.getItem('lastPath')

    if (auth) {
      if (lastPath && lastPath !== '/') {
        navigate(lastPath)
      } else {
        navigate('/login')
      }
    }
  }, [navigate])

  return (
    <Layout className='h100'>
      <Layout.Content className='app-container'>
        <AppRouter />
      </Layout.Content>
    </Layout>
  )
}

export default App
