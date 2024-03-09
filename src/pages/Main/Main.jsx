import React, { useEffect, useState } from 'react'
import s from './Main.module.scss'
import Navbar from '../../components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom'
import News from '../News/News';
import Clients from '../Clients/Clients';
import axios from 'axios';
import User from '../User/User';
import Snake from '../game/Snake/Snake';

const API_URL = import.meta.env.VITE_API_URL

const Main = ({ isLogin, menu, clickMenu }) => {

    const [posts, setPosts] = useState(null)

    const getPosts = async () => {
        try {

            await axios.get(API_URL + '/posts')
                .then(res => {
                    // console.log(res.data)
                    setPosts(res.data.reverse())
                })

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <div className={s.main}>
            <div className={`${s.in_main} container`}>
                <Navbar clickMenu={clickMenu} menu={menu} isLogin={isLogin} getPosts={getPosts} />
                <Routes>
                    <Route path="/" element={<News posts={posts} setPosts={setPosts} />} />
                    <Route path="/users" element={<Clients />} />
                    <Route path="/user/:id" element={<User isLogin={isLogin} />} />
                    <Route path="/game" element={<Snake />} />
                </Routes>
            </div>
        </div>
    );
};
export default Main