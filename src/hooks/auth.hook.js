import { useState, useEffect, useCallback } from "react";

export const useAuth = () => {
    const [name, setName] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [isReady, setIsReady] = useState(null)

    const login = useCallback((jwtToken, name, id, avatar) => {
        setToken(jwtToken)
        setUserId(id)
        setName(name)
        setAvatar(avatar)
        localStorage.setItem('userData', JSON.stringify({
            userId: id,
            name: name,
            token: jwtToken,
            avatar: avatar
        }))
    }, [])

    const logout = () => {
        setToken(null)
        setUserId(null)
        setName(null)
        setAvatar(null)
        localStorage.removeItem('userData')
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userData'))
        if (data && data.token) {
            login(data.token, data.name, data.userId, data.avatar)
        }
        setIsReady(true)
    }, [login])

    return { login, logout, token, userId, isReady, name, avatar }
}