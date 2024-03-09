import React from 'react'
import s from './BlackBtn.module.scss'

const BlackBtn = ({ children, ...props }) => {
    return (
        <button {...props} className={s.button}>
            {children}
        </button>
    );
};
export default BlackBtn