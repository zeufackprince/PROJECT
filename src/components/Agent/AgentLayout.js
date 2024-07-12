import React from 'react';
import AgentMenu from './DashMenuAgent/AgentMenu'
import { Outlet } from 'react-router-dom';

const AgentLayout = () => {
    return (
        <div className='ALayout'>
            <AgentMenu/>
            <Outlet/>
        </div>
    );
};

export default AgentLayout;