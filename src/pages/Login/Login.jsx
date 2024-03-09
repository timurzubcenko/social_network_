import React, { useState, useContext } from 'react'
import s from './Login.module.scss'
import Input from '../../components/UI/Input/Input';
import BlackBtn from '../../components/UI/BlackBtn/BlackBtn';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL

const Login = () => {

    const { login } = useContext(AuthContext)

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const onSubmit = async () => {
        try {
            await axios.post(API_URL + '/auth/login', form)
                .then(res => {
                    console.log(res.data._id)
                    login(res.data.token, res.data.fullName, res.data._id, res.data.avatarUrl)
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={s.login}>
            <div className={s.window}>
                <h2>Авторизация</h2>
                <div className={s.inputs}>
                    <Input onChange={onChange} type="email" name="email" id="in_email" placeholder="Email..." />
                    <Input onChange={onChange} type="password" name="password" id="in_password" placeholder="Password..." />
                </div>
                <div className={s.btns}>
                    <Link to="/register">Еще нет аккаунта?</Link>
                    <BlackBtn onClick={onSubmit}>Войти</BlackBtn>
                </div>
            </div>
        </div>
    );
};
export default Login