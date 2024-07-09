import React from 'react';
import { Route,Routes } from 'react-router-dom';
import Login from './Login';
import Registration from './Registration';
import Header from '../Public/Header/Header'
//
const AuthRouter = () => {
    return (
        <div>
            <Header/>
            <Routes>
                <Route index element ={<Login/>}/>
                <Route path='/login' element ={<Login/>}/>
                <Route path ='/inscription' element={<Registration/>}/>
            </Routes>
           
        </div>
    );
};

export default AuthRouter;