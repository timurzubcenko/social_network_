import './App.css'
import Login from './pages/Login/Login'
import { BrowserRouter } from 'react-router-dom'
import MyRoute from './routes/MyRoute'
import { AuthContext } from './context/AuthContext'
import { useAuth } from './hooks/auth.hook';
import Header from './components/Header/Header'
import { useState } from 'react'

function App() {
  const { login, logout, token, userId, isReady, name, avatar } = useAuth()
  const isLogin = !!token

  const [menu, setMenu] = useState(false)

  const clickMenu = () => {
    setMenu(!menu)
  }

  return (
    <AuthContext.Provider value={{ login, logout, token, userId, isReady, isLogin, name, avatar }}>
      <BrowserRouter>
        <div className='App'>
          <Header clickMenu={clickMenu} isLogin={isLogin} />
          <MyRoute clickMenu={clickMenu} menu={menu} isLogin={isLogin} />
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
