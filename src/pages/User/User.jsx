import React, { useEffect, useState, useContext } from 'react'
import s from './User.module.scss'
import { useParams } from 'react-router-dom';
import authHeader from '../../services/header.service'
import axios from 'axios';
import Post from '../../components/Post/Post';
import { AuthContext } from '../../context/AuthContext';
import BlackBtn from '../../components/UI/BlackBtn/BlackBtn';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL
const API_IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL

const User = ({ isLogin }) => {

    const [userPosts, setUserPosts] = useState([])
    const [user, setUser] = useState(null)
    const [avatarImg, setAvatarImg] = useState(null)

    const userId = useParams().id
    const authUser = useContext(AuthContext)

    const getUser = async () => {
        try {

            await axios.get(API_URL + '/users/users/' + userId, { headers: authHeader() })
                .then((res) => {
                    // console.log(res.data)
                    setUser(res.data)
                })

        } catch (error) {
            console.log(error)
        }
    }

    const getUserPosts = async () => {
        try {

            await axios.get(API_URL + '/posts/user/' + userId, { headers: authHeader() })
                .then(res => setUserPosts(res.data))

        } catch (error) {
            console.log(error)
        }
    }

    const onChangeAvatar = async (e) => {
        const img = e.target.files[0]

        const data = new FormData()

        data.append('image', img)
        console.log(data)

        await axios.post(API_URL + '/upload', data)
            .then((res) => {
                console.log(res.data.url.split('/')[2])
                setAvatarImg(res.data.url.split('/')[2])
            })
    }

    const onSubmitAvatar = async () => {
        try {
            await axios.patch(API_URL + '/users/userupdate/' + userId, { avatarUrl: avatarImg }, { headers: authHeader() })
                .then(res => {
                    console.log(res.data)
                    setUser({ ...user, avatarUrl: avatarImg })
                    localStorage.setItem('userData', JSON.stringify({
                        userId: authUser.userId,
                        name: authUser.name,
                        token: authUser.token,
                        avatar: avatarImg
                    }))
                    location.reload()
                })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUserPosts()
        getUser()
    }, [])

    return (
        <div className={s.user_main}>
            {
                isLogin ?
                    <div className={s.user}>
                        <div className={s.set_avatar}>
                            <div className={s.avatar}>
                                <img src={API_IMAGE_URL + user?.avatarUrl} alt="" />
                            </div>
                            {
                                userId === authUser.userId
                                    ?
                                    <div className={s.file}>
                                        <input onChange={onChangeAvatar} className={s.file_avatar} type="file" />
                                        <BlackBtn onClick={onSubmitAvatar}>Success</BlackBtn>
                                    </div>
                                    : ''
                            }
                        </div>
                        <div className={s.info}>
                            <h3>Name: {user?.fullName}</h3>
                            <p>Email: {user?.email}</p>
                        </div>
                    </div>
                    : <Link to="/login"><BlackBtn>Войти</BlackBtn></Link>
            }
            <div className={s.posts}>
                {
                    userPosts.map((post) =>
                        <Post key={post._id} post={post} posts={userPosts} setPosts={setUserPosts} />
                    )
                }
            </div>
        </div>
    );
};
export default User