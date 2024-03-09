import React, { useContext, useState } from 'react'
import s from './Navbar.module.scss'
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FileEarmarkPlusFill, TypeH3 } from 'react-bootstrap-icons'
import Modal from '../Modal/Modal';

const API_IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL

const navLinks = [
    {
        id: 1,
        path: '/main',
        title: 'News'
    },
    {
        id: 2,
        path: '/main/users',
        title: 'Users'
    },
    {
        id: 3,
        path: '/main/game',
        title: 'Games'
    },
]

const Navbar = ({ getPosts, isLogin, menu, clickMenu }) => {

    const { name, userId, avatar } = useContext(AuthContext)
    // console.log(name, userId, avatar)

    const [activeModal, setActiveModal] = useState(false)
    const [links, setLinks] = useState(navLinks)
    const [statusLink, setStatusLink] = useState(1)
    const path = useLocation().pathname

    const activateModal = () => {
        setActiveModal(!activeModal)
    }

    const getStatus = (id) => {
        setStatusLink(id)
    }

    return (
        <nav className={`${s.nav} ${menu ? s.active : ''}`}>
            <Modal getPosts={getPosts} activeModal={activeModal} activateModal={activateModal} />
            <div className={s.user}>
                {
                    isLogin
                        ?
                        <div className={s.name}>
                            <img src={API_IMAGE_URL + avatar} alt="" />
                            <Link to={`/main/user/${userId}`}><h2>{name}</h2></Link>
                        </div>
                        :
                        <h3>Social Network</h3>
                }
                <div onClick={activateModal} className={s.btn}><FileEarmarkPlusFill /></div>
            </div>
            <ul>
                {links.map(link =>
                    <Link onClick={clickMenu} key={link.id} to={link.path}><li className={`${s.link} ${path === link.path ? s.active : ''}`}>{link.title}</li></Link>
                )}
            </ul>
        </nav >
    );
};
export default Navbar