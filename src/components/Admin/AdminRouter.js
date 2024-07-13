import React from 'react';
import { Route,Routes } from 'react-router-dom';
import ALayout from './ALayout';
import DashMain from '../../pages/Admin/DashMain/DashMain'
import MainList from '../../pages/Admin/crud-app-clients/MainList';
import CreateNewBelongingForm from '../../pages/Admin/ManageLogement/addlogements/CreateNewBelongingForm'
import Logements from '../../pages/Admin/crud-app-logements/Logements';
import Room from '../../pages/Admin/ManageLogement/Room';
import Studios from '../../pages/Admin/ManageLogement/Studios';
import Apartements from '../../pages/Admin/ManageLogement/Apartement';
import Notification from '../../pages/Admin/Notifications/NotificationsAdmin';
import MiseAJourLogementForm from '../../pages/Admin/ManageLogement/updateLogement/miseAJourLogementForm';
import PublishLogement from '../../pages/Admin/ManageLogement/publicationLogement/Main';
import Logout from '../Auth/Logout';
import RegistrationA from '../../pages/Admin/_authAdmin/RegistrationA';
import EditAProfile from '../../pages/Admin/_authAdmin/EditAProfile';
import Parametre from '../../pages/Parametre/Parametre';
import Acceuil from '../../pages/Accueil/Acceuil';

const AdminRouter = () => {
    return (
         <Routes>
            <Route element ={<ALayout/>}>
                <Route index element ={<DashMain/>}/>

                <Route path='/' element={<Acceuil/>}/>

                {/* vers le menu de l'admin */}
                <Route path='/dashboard' element ={<DashMain/>}/>

                {/* vers la list des utilisateur */}
                <Route path='/crud-client' element={<MainList/>}/>

                {/* vers le formulaire d'ajoute d'agent */}
                <Route path='/new-agent' element={<RegistrationA/>} />

                {/* */}
                <Route path='/editer-profil' element={<EditAProfile/>} />

                {/*  */}
                <Route path='/crud-logements' element={<Logements/>}/>
                <Route path='/create-new-belonging' element={<CreateNewBelongingForm />} />
                <Route path='/room' element={<Room />} />
                <Route path='/studios' element={<Studios />} />
                <Route path='/apartement' element={<Apartements />} />
                <Route path='/notification' element={<Notification />} />
                <Route path='/update-Logement' element={<MiseAJourLogementForm />} />
                <Route path='/publish-Logement' element={<PublishLogement />} />
                <Route path='/parametre' element={<Parametre/>} />
                <Route path='/deconnexion' element={<Logout/>} />
            </Route>
        </Routes>            
    );
};

export default AdminRouter;