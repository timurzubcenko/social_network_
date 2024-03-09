import React, { useState } from 'react'
import s from './Snake.module.scss'
import BlackBtn from '../../../components/UI/BlackBtn/BlackBtn';
import Square from '../Square/Square';

const Snake = () => {

    const [statusBtn, setStatusBtn] = useState(false)

    const onClick = () => {
        setStatusBtn(!statusBtn)
    }

    let squares = []

    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            squares.push({ x, y, index: Math.random() })
        }
    }

    return (
        <div className={s.playground}>
            <BlackBtn onClick={onClick}>{statusBtn ? 'Resume' : 'Start'}</BlackBtn>
            <div className={s.board}>
                {squares.map((square) => {
                    return (
                        <span key={square.index}>
                            <Square />
                        </span>
                    )
                })}
            </div>
        </div>
    );
};
export default Snake