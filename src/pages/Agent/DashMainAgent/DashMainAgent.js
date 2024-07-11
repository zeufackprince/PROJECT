import React from 'react';
import TopContainerAgent from './TopContainerAgent';
import MainContainerAgent from './MainContainerAgent/MainContainerAgent';
import './dashMainAgent.css'

const DashMainAgent = () => {
    return (
        <div className='container'>
            <TopContainerAgent/>
            <MainContainerAgent/>
        </div>
    );
};

export default DashMainAgent;