import React from 'react';
import { Routes,Route } from 'react-router-dom';
import AgentLayout from './AgentLayout';
import DashMainAgent from '../../pages/Agent/DashMainAgent/DashMainAgent';
import ParametreAgent from '../../pages/Agent/Parametre/ParametreAgent';
import CreateNewBelongingForm from '../../pages/Admin/ManageLogement/addlogements/CreateNewBelongingForm'
import Logements from '../../pages/Admin/crud-app-logements/Main';
import Room from '../../pages/Admin/ManageLogement/Room';
import Studios from '../../pages/Admin/ManageLogement/Studios';
import Apartement from '../../pages/Admin/ManageLogement/Apartement';
import PublishLogement from '../../pages/Admin/ManageLogement/publicationLogement/Main';
import Notification from '../../pages/Agent/NotificationsAgent/Main';
import Logout from '../Auth/Logout';
import EditAProfile from '../../pages/Admin/_authAdmin/EditAProfile';


const AgentRouter = () => {
    return (
        <div>
            <Routes>
                <Route element ={<AgentLayout/>}>
                    <Route index element ={<DashMainAgent/>}/>

                    <Route path='/dashboard' element ={<DashMainAgent/>}/>

                    <Route path='/editer-profil' element={<EditAProfile/>} />

                    {/* */}
                    <Route path='/crud-logements' element={<Logements/>}/>
                    <Route path='/create-new-belonging' element={<CreateNewBelongingForm />} />
                    <Route path='/room' element={<Room />} />
                    <Route path='/studios' element={<Studios />} />
                    <Route path='/apartement' element={<Apartement />} />
                    <Route path='/notification' element={<Notification />} />
                    <Route path='/update-Logement' element={<miseAJourLogementForm />} />
                    <Route path='/publish-Logement' element={<PublishLogement />} />
                    <Route path='/parametre' element={<ParametreAgent/>} />
                    <Route path='/deconnexion' element={<Logout/>} />
                </Route>
            </Routes>
        </div>
    );
};

export default AgentRouter;