import React from 'react';
import { Layout } from 'antd';
import Navbar from '../components/Navbar';
import { Counter } from '../components/Counter/index';

const CounterPage: React.FC = () => {
  return (
    <div>
      <h1>Counter Page</h1>
      <Counter />
    </div>
  );
}

export default CounterPage;
