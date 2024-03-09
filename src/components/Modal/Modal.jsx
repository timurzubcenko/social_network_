import React, { useContext } from 'react'
import s from './Modal.module.scss'
import axios from 'axios'
import { useState } from 'react';
import BlackBtn from '../../components/UI/BlackBtn/BlackBtn'
import authHeader from '../../services/header.service'
import { Download } from 'react-bootstrap-icons'
import { AuthContext } from '../../context/AuthContext';
import Input from '../UI/Input/Input';

const API_URL = import.meta.env.VITE_API_URL

const Modal = ({ activeModal, activateModal, getPosts }) => {

    // const [img, setImg] = useState(null)
    const [image, setImage] = useState(null)

    const { name, avatar } = useContext(AuthContext)

    const [post, setPost] = useState({
        imageUrl: '',
        title: '',
        text: ''
    })

    const onChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
        console.log(post)
    }

    const acceptImg = async (e) => {
        const img = e.target.files[0]

        const data = new FormData()

        data.append('image', img)
        console.log(data)

        await axios.post(API_URL + '/upload', data)
            .then((res) => {
                console.log(res)
                setImage(res.data.url)
            })
    }

    const sendPost = async () => {
        try {
            // console.log(img)

            await axios.post(API_URL + '/posts/create', { ...post, imageUrl: image, name, avatarUrl: avatar }, {
                headers: authHeader()
            })
                .then((res) => {
                    console.log(res)
                    getPosts()
                    activateModal()
                    setImage(null)
                    setPost({
                        ...post,
                        imageUrl: '',
                        title: '',
                        text: ''
                    })
                })

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div onClick={activateModal} className={`${s.modal} ${activeModal ? s.active : ''}`}>
            <div onClick={(e) => e.stopPropagation()} className={s.window}>
                <h2>Создать пост</h2>
                <div className={s.form}>
                    <div className={s.block_file}>
                        <input className={s.file} onChange={acceptImg} type="file" name='imageUrl' />
                        <div className={s.costome_file}>
                            <div className={s.btn}>
                                {
                                    image !== null
                                        ? <img src={API_URL + image} />
                                        : <Download />
                                }
                            </div>
                        </div>
                    </div>
                    <Input onChange={onChange} type="title" placeholder='Title...' name='title' />
                    <textarea onChange={onChange} name="text" id="" cols="30" rows="10" placeholder='Text...' ></textarea>
                    {/* <BlackBtn onClick={acceptImg}>Подтвердить изображение</BlackBtn> */}
                    <BlackBtn onClick={sendPost}>Send</BlackBtn>
                </div>
            </div>
        </div>
    );
};
export default Modal