import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRouter from "./components/Public/PublicRouter";
import AdminRouter from "./components/Admin/AdminRouter";
import AuthRouter from "./components/Auth/AuthRouter";
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { AuthProvider } from './components/Auth/AuthProvider';
import Registration from "./components/Auth/Registration";
import Login from "./components/Auth/Login";
import ResultSearch from "./pages/Public/ResultSearch/ResultSearch";
import SearchRouter from "./components/Public/Search/SearchRouter";
import './App.css'
import AgentRouter from "./components/Agent/AgentRouter";

class App extends React.Component {
    render() {
        return (
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/*' element={<PublicRouter />} />

                        <Route path='/admin/*' element={
                             <ProtectedRoute role="ADMIN">
                                <AdminRouter />
                              </ProtectedRoute>
                        } />

                        <Route path="/agent/*" element = {<AgentRouter />}/>

                        <Route path='/auth/*' element={<AuthRouter />}>
                            <Route path='inscription' element={<Registration />} />
                            <Route path='login' element={<Login />} />
                        </Route>
                        
                        <Route path="/rechercher/*" element ={<SearchRouter/>}>
                            <Route path="resultats" element={<ResultSearch/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        );
    }
}

export default App;
