import React, { useState } from 'react'
import s from './Register.module.scss'
import Input from '../../components/UI/Input/Input';
import BlackBtn from '../../components/UI/BlackBtn/BlackBtn';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const Register = () => {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        email: '',
        fullName: '',
        password: ''
    })

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const onSubmit = async () => {
        try {

            await axios.post(API_URL + '/auth/register', form)
                .then(res => {
                    console.log(res.data)
                    navigate('/login')
                })

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={s.login}>
            <div className={s.window}>
                <h2>Регистрация</h2>
                <div className={s.inputs}>
                    <Input onChange={onChange} type="text" name="email" id="in_email" placeholder="Email..." />
                    <Input onChange={onChange} type="text" name="fullName" id="in_name" placeholder="Name..." />
                    <Input onChange={onChange} type="password" name="password" id="in_password" placeholder="Password..." />
                </div>
                <div className={s.btns}>
                    <Link to="/login">Уже есть аккаунт?</Link>
                    <BlackBtn onClick={onSubmit}>Войти</BlackBtn>
                </div>
            </div>
        </div>
    );
};
export default Register