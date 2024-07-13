import React from 'react';
import { Routes,Route } from 'react-router-dom';
import AgentLayout from './AgentLayout';
import DashMainAgent from '../../pages/Agent/DashMainAgent/DashMainAgent';
import ParametreAgent from '../../pages/Agent/Parametre/ParametreAgent';
import CreateNewBelongingForm from '../../pages/Agent/ManageLogement/addlogements/CreateNewBelongingForm'
import Logements from '../../pages/Agent/crud-app-logements/LogementsAg';
import Room from '../../pages/Agent/ManageLogement/RoomAg';
import Studios from '../../pages/Agent/ManageLogement/StudiosAg';
import Apartement from '../../pages/Agent/ManageLogement/ApartementAg';
import PublishLogement from '../../pages/Agent/ManageLogement/publicationLogement/Main';
import Notification from '../../pages/Agent/NotificationsAgent/NotificationsAg';
import Logout from '../Auth/Logout';
import EditAProfile from '../../pages/Admin/_authAdmin/EditAProfile';
import Acceuil from '../../pages/Accueil/Acceuil';
import MiseAJourLogementForm from '../../pages/Agent/ManageLogement/updateLogement/miseAJourLogementForm';


const AgentRouter = () => {
    return (
        <div>
            <Routes>
                <Route element ={<AgentLayout/>}>
                    <Route index element ={<DashMainAgent/>}/>

                    <Route path='/' element={<Acceuil/>}/>

                    <Route path='/dashboard' element ={<DashMainAgent/>}/>

                    <Route path='/editer-profil' element={<EditAProfile/>} />

                    {/* */}
                    <Route path='/crud-logements' element={<Logements/>}/>
                    <Route path='/create-new-belonging' element={<CreateNewBelongingForm />} />
                    <Route path='/room' element={<Room />} />
                    <Route path='/studios' element={<Studios />} />
                    <Route path='/apartement' element={<Apartement />} />
                    <Route path='/notification' element={<Notification />} />
                    <Route path='/update-Logement' element={<MiseAJourLogementForm />} />
                    <Route path='/publish-Logement' element={<PublishLogement />} />
                    <Route path='/parametre' element={<ParametreAgent/>} />
                    <Route path='/deconnexion' element={<Logout/>} />
                </Route>
            </Routes>
        </div>
    );
};

export default AgentRouter;