import React, { version } from 'react';
import { Layout } from 'antd';
import Navbar from '../Navbar'; // Adjust the import path as necessary
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
                    {/* <h2 className='header'>{header} page   </h2> */}
                </>
            )}
            <Content className="app-content">
                {children}
            </Content>
            <footer className={'app-footer'}>
                © {new Date().getFullYear()} - v{version}
            </footer>
        </Layout>
    );
};

export default LayoutWrapper;