import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Mainlogin from './Login/Mainlogin';
import Adminlogin from './Login/Adminlogin';
import Userlogin from './Login/Userlogin';
import Addtask from './User/Addtask';
import Adduser from './Admin/Adduser';
import './App.css';

function App(){
    return(
        <>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Mainlogin/>} />
                        <Route path="/user" element={<Userlogin/>} />
                        <Route path="/admin" element={<Adminlogin/>} />
                        <Route path="/addtask" element={<Addtask/>} />
                        <Route path="/adduser" element={<Adduser/>} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    )
}

export default App;