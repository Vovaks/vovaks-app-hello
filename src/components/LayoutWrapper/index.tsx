import React from 'react';
import { Layout } from 'antd';
import Navbar from '../../components/Navbar'; // Adjust the import path as necessary
const { Content } = Layout;

interface LayoutWrapperProps {
    header: React.ReactNode;
    isAuthenticated: boolean;
    children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ header, isAuthenticated, children }) => {
    return (
        <Layout className="app-container">
            {isAuthenticated && (
                <>
                    <Navbar />
                    <h2 className='header'>{header} page   </h2>
                </>
            )}
            <Content className="app-content">
                {children}
            </Content>
        </Layout>
    );
};

export default LayoutWrapper;