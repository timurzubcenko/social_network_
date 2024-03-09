import React, { useEffect, useState, useContext } from 'react'
import s from './Like.module.scss'
import { Heart, HeartFill } from 'react-bootstrap-icons'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import authHeader from '../../services/header.service'

const API_URL = import.meta.env.VITE_API_URL

const Like = ({ post }) => {

    const { userId } = useContext(AuthContext)

    const [isLike, setIsLike] = useState(false)
    const [countLike, setCountLike] = useState(0)

    useEffect(() => {
        setCountLike(post.like.length)

        setIsLike(post.like.includes(userId))
    }, [post.like, userId])

    const clickLike = async () => {
        try {

            await axios.get(API_URL + '/posts/like/' + post._id, { headers: authHeader() })
                .then(res => {
                    console.log(res)
                    if (res.status === 200) {
                        if (isLike) {
                            setCountLike(countLike - 1)
                        }
                        else {
                            setCountLike(countLike + 1)
                        }
                        setIsLike(!isLike)
                    }
                })

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div onClick={clickLike} className={s.like}>
            <i>
                {
                    isLike
                        ? <HeartFill />
                        : <Heart />
                }
            </i>
            <p>{countLike}</p>
        </div>
    );
};
export default Like