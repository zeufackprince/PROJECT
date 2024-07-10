import React from 'react';
import { Routes,Route } from 'react-router-dom';
import AgentLayout from './AgentLayout';
import DashMainAgent from '../../pages/Agent/DashMainAgent/DashMainAgent'
const AgentRouter = () => {
    return (
        <div>
            <Routes>
                <Route element ={<AgentLayout/>}>
                    <Route index element ={<DashMainAgent/>}/>
                    <Route path='/dashboard' element ={<DashMainAgent/>}/>
                    
                </Route>
            </Routes>
        </div>
    );
};

export default AgentRouter;