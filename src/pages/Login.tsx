import React from 'react'
import { Layout, Row, Card } from 'antd'
import LoginForm from '../components/LoginForm'

const Login: React.FC = () => {
  return (
    <Layout className='login-page'>
      <Row justify='center' align='middle'>
        <Card className='card'>
          <LoginForm />
        </Card>
      </Row>
    </Layout>
  )
}

export default Login
