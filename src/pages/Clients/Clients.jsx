import React, { useEffect, useState } from 'react'
import s from './Clients.module.scss'
import axios from 'axios';
import authHeader from '../../services/header.service'
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import Loader2 from '../../components/Loader2/Loader2';

const API_URL = import.meta.env.VITE_API_URL
const API_IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL

const Clients = () => {

    const [users, setUsers] = useState(null)

    const getUsers = async () => {
        try {

            await axios.get(API_URL + '/users')
                .then((res) => {
                    // console.log(res.data)
                    setUsers(res.data)
                })

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])
    console.log(users)

    return (
        <div className={s.clients}>
            <div className={s.users}>
                {
                    users !== null
                        ? users.map((user, index) =>
                            <Link key={index} to={`/main/user/${user._id}`}>
                                <div className={s.user}>
                                    <img src={API_IMAGE_URL + user.avatarUrl} alt="" />
                                    <p>{user.fullName}</p>
                                </div>
                            </Link>
                        )
                        : <div className={s.load}><Loader2 /></div>
                }
            </div>
        </div>
    );
};
export default Clients