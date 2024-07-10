import React from 'react';
import { Routes } from 'react-router-dom';
import AgentLayout from './AgentLayout';
import DashMainAgent from '../../pages/Agent/DashMainAgent/DashMainAgent'
const AgentRouter = () => {
    return (
        <div>
            <Routes>
            <Route element ={<AgentLayout/>}>
                <Route index element ={<DashMainAgent/>}/>
                <Route path='/dashboard' element ={<DashMain/>}/>
                <Route path='/crud-client' element={<MainList/>}/>
                <Route path='/crud-logements' element={<Logements/>}/>
                <Route path='/create-new-belonging' element={<CreateNewBelongingForm />} />
                <Route path='/room' element={<Room />} />
                <Route path='/studios' element={<Studios />} />
                <Route path='/apartement' element={<Apartements />} />
                <Route path='/notification' element={<Notification />} />
                <Route path='/update-Logement' element={<miseAJourLogementForm />} />
                <Route path='/publish-Logement' element={<PublishLogement />} />
                <Route path='/deconnexion' element={<Logout/>} />
            </Route>
            </Routes>
        </div>
    );
};

export default AgentRouter;