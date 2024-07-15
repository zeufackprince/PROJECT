import React from 'react';
import TopContainerAgent from './DashTopContainerAgent';
import DashMainContainerAgent from './DashMainContainerAgent/DashMainContainerAgent';
import './dashMainAgent.css';

const DashMainAgent = () => {
    return (
        <div className='dash-container'>
            <TopContainerAgent/>
            <DashMainContainerAgent/>
        </div>
    );
};

export default DashMainAgent;