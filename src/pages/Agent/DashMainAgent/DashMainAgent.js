import React from 'react';
import TopContainerAgent from './DashTopContainerAgent';
import DashMainContainerAgent from './DashMainContainerAgent/DashMainContainerAgent';
import '../../Admin/DashMain/DashMain.css';

const DashMainAgent = () => {
    return (
        <div className='Container'>
            <TopContainerAgent/>
            <DashMainContainerAgent/>
        </div>
    );
};

export default DashMainAgent;