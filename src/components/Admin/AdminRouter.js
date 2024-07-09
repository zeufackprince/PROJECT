import React from 'react';
import { Route,Routes } from 'react-router-dom';
import ALayout from './ALayout';
import DashMain from '../../pages/Admin/DashMain/DashMain'
import MainList from '../../pages/Admin/crud-app-clients/MainList';
import CreateNewBelongingForm from '../../pages/Admin/ManageLogement/addlogements/CreateNewBelongingForm'
import Logout from '../Auth/Logout';
import Logements from '../../pages/Admin/crud-app-logements/Main';
import Room from '../../pages/Admin/ManageLogement/Room';
import Studios from '../../pages/Admin/ManageLogement/Studios';
import Apartements from '../../pages/Admin/ManageLogement/Apartement';

const AdminRouter = () => {
    return (
         <Routes>
            <Route element ={<ALayout/>}>
                <Route index element ={<DashMain/>}/>
                <Route path='/dashboard' element ={<DashMain/>}/>
                <Route path='/crud-client' element={<MainList/>}/>
                <Route path='/crud-logements' element={<Logements/>}/>
                <Route path='/create-new-belonging' element={<CreateNewBelongingForm />} />
                <Route path='/room' element={<Room />} />
                <Route path='/studios' element={<Studios />} />
                <Route path='/apartement' element={<Apartements />} />
                <Route path='/deconnexion' element={<Logout/>} />
            </Route>
        </Routes>            
    );
};

export default AdminRouter;