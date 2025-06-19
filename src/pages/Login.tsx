import { Layout, Row, Card } from 'antd';
import LoginForm from '../components/LoginForm';
import React from 'react';

const Login: React.FC = () => {
    return (
        <Layout>
            <Row justify="center" align="middle" className="h100">
                <Card className="card">
                    <LoginForm />
                </Card>
            </Row>
        </Layout>
    );
};

export default Login;