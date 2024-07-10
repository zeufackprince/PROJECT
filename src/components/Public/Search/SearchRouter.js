import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Seacrh from './Search';
import ResultSearch from '../../../pages/Public/ResultSearch/ResultSearch';
import Header from '../Header/Header';

const SearchRouter = () => {
    return (
        <>
            <Header/>
            <Routes>
                <Route index element={<Seacrh/>}/>
                <Route path='resultats' element ={<ResultSearch/>}/>
            </Routes>
        </>
    );
};

export default SearchRouter;