import React from 'react'
import s from './Input.module.scss'

const Input = ({ ...props }) => {
    return (
        <input {...props} className={s.input} />
    );
};
export default Input