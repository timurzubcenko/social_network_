import React, { useContext } from 'react'
import s from './MenuPost.module.scss'
import { AuthContext } from '../../context/AuthContext'

const MenuPost = ({ activeMenu, deletePost, clickMenu, post }) => {
    const { userId } = useContext(AuthContext)
    return (
        <div className={`${s.menu} ${activeMenu ? s.active : ''}`}>
            <ul>
                {post.user._id === userId || post.user === userId ? <li onClick={deletePost}>Delete</li> : ''}
                <li onClick={clickMenu} className={s.close}>Close</li>
            </ul>
        </div>
    );
};
export default MenuPost