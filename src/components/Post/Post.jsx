import React, { useState } from 'react'
import s from './Post.module.scss'
import { ThreeDots, Heart, HeartFill, ChatLeft } from 'react-bootstrap-icons'
import MenuPost from '../MenuPost/MenuPost';
import axios from 'axios'
import authHeader from '../../services/header.service'
import Like from '../Like/Like';

const API_URL = import.meta.env.VITE_API_URL
const API_IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL

const Post = ({ post, posts, setPosts }) => {

    const [activeMenu, setActiveMenu] = useState(false)
    const [day, setDay] = useState(post.createdAt.split('-')[2].split('T')[0])
    const [month, setMonth] = useState(post.createdAt.split('-')[1])
    const [year, setYear] = useState(post.createdAt.split('-')[0])
    const [time, setTime] = useState(post.createdAt.split('T')[1].split('.')[0])


    const clickMenu = () => {
        setActiveMenu(!activeMenu)
    }

    const deletePost = async () => {
        try {

            await axios.delete(API_URL + '/posts/' + post._id, {
                headers: authHeader()
            })
                .then(res => {
                    console.log(res)
                    setPosts(posts.filter(p => p._id !== post._id))
                })

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={s.post}>
            <MenuPost post={post} clickMenu={clickMenu} deletePost={deletePost} activeMenu={activeMenu} />
            <div className={s.header_post}>
                <div className={s.user}>
                    <img src={API_IMAGE_URL + post?.avatarUrl} alt="" />
                    <h3>{post.userName}</h3>
                </div>
                <div onClick={clickMenu} className={s.dots}><ThreeDots /></div>
            </div>
            <div className={s.img_post}>
                <img src={API_URL + post.imageUrl} alt="" />
            </div>
            <div className={s.date}>
                <p>Created {day}.{month}.{year} at {time}</p>
            </div>
            <div className={s.description}>
                <h3>{post.title}</h3>
                <p>{post.text}</p>
            </div>
            <div className={s.activations}>
                <Like post={post} />
                <div className={s.comment}>
                    <ChatLeft /> <p>0</p>
                </div>
            </div>
        </div>
    );
};
export default Post