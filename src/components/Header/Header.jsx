import React, { useContext } from 'react'
import s from './Header.module.scss'
import { AuthContext } from '../../context/AuthContext';
import BlackBtn from '../UI/BlackBtn/BlackBtn';
import { Link } from 'react-router-dom';
import { MenuButtonWideFill } from 'react-bootstrap-icons'

const Header = ({ isLogin, clickMenu }) => {

    const { name, logout } = useContext(AuthContext)

    return (
        <header className={s.header}>
            <div className={`${s.in_header} container`}>
                <h2>{'Social Network'}</h2>
                <div className={s.elems}>
                    <i onClick={clickMenu}><MenuButtonWideFill /></i>
                    {isLogin ? <BlackBtn onClick={logout}>Выйти</BlackBtn> : <Link to="/login"><BlackBtn>Войти</BlackBtn></Link>}
                </div>
            </div>
        </header>
    );
};
export default Header