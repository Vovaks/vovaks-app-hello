import React, { useState } from 'react'
import { Form, Input, Button } from 'antd'
import { rules } from '../utils/rules'
import { login } from '../store/reducers/auth'
import { useAppDispatch, useAppSelector } from '../hooks'
import { IAuthState } from '../store/reducers/auth/auth.types'

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const { isLoading, error } = useAppSelector((state: { auth: IAuthState }) => state.auth)

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    dispatch(login({ username: name, password: password }))
  }

  return (
    <Form onFinish={handleSubmit} layout='vertical' className='LoginForm'>
      <Form.Item label='Name' name='name' rules={[rules.required('Please input your name!')]}>
        <Input
          type='name'
          value={name}
          onChange={(e: { target: { value: string } }) => setName(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        label='Password'
        name='password'
        rules={[rules.required('Please input your password!')]}
      >
        <Input.Password
          value={password}
          onChange={(e: { target: { value: string } }) => setPassword(e.target.value)}
        />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' loading={isLoading}>
          Login
        </Button>
      </Form.Item>
      <div className='errorMessage'>{error && error}</div>
    </Form>
  )
}

export default LoginForm
