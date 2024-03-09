import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import Main from '../pages/Main/Main'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'

const MyRoute = ({ isLogin, menu, clickMenu }) => {
    if (isLogin) {
        return (
            <Routes>
                <Route path='/main/*' element={<Main clickMenu={clickMenu} menu={menu} isLogin={isLogin} />} />
                <Route path="*" element={<Navigate to={'/main'} />} />
                <Route path='/login' element={<Navigate to={'/main'} />} />
                <Route path='/' element={<Navigate to={'/main'} />} />
            </Routes>
        )
    }
    return (
        <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/main/*' element={<Main />} />
            <Route path="*" element={<Navigate to={'/login'} />} />
        </Routes>
    )
};
export default MyRoute