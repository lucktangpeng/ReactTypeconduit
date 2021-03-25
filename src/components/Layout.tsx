import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, HashRouter } from 'react-router-dom'
import { loginAction } from '../store/actions/user.action'
import { AppState } from '../store/reducers'
import { loginState } from '../store/reducers/user.reducer'
import { getStorageUser } from '../utils/user'
import { createHashHistory } from 'history';
const Nav = () => {
  const history = createHashHistory();
  const login = useSelector<AppState, loginState>(state => state.login)
  console.log(login)
  const dispatch = useDispatch()
  

  if (!login.userInfo.username && !login.userInfo.token) {
    
    const user = getStorageUser()
    if (user) {
      dispatch(loginAction(JSON.parse(user!)))
    } else {
      history.push('/login/')
    }
  }

  const BeforLogin = () => {
    const {userInfo:{ image, username }} = useSelector<AppState, loginState>(state => state.login)
    if (username) {
      return (
        <li className="nav-item">
            <HashRouter>
              <Link className="nav-link" to={`/userInfo/${login.userInfo.username}`}>{username}</Link>
              <img src={image} alt=""/>
            </HashRouter>
        </li>
      )
    } else {
      return (
        <>
        <li className="nav-item">
          <HashRouter>
          <Link className="nav-link" to="/regist">Sign up</Link>
          </HashRouter>
        </li>
        <li className="nav-item">
          <HashRouter>
            <Link className="nav-link" to="/login">Sign in</Link>
          </HashRouter>
        </li>
        </>
      )
    }
  }

  return (
    <div>
      <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="index.html">conduit</a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <HashRouter>
              <Link className="nav-link active" to="/">Home</Link>
            </HashRouter>
          </li>
          <li className="nav-item">
            <HashRouter>
              <Link className="nav-link" to="/"><i className="ion-compose"></i>&nbsp;New Post</Link>
            </HashRouter>
          </li>
          <li className="nav-item">
            <HashRouter>
              <Link className="nav-link" to="/"><i className="ion-gear-a"></i>&nbsp;Settings</Link>
            </HashRouter>
          </li>
          <BeforLogin/>
        </ul>
      </div>
    </nav>
    </div>
  )
}

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <a href="/" className="logo-font">conduit</a>
        <span className="attribution">
          An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
        </span>
      </div>
  </footer>
  )
}

interface Props {
  children: React.ReactNode
}

const Layout: FC<Props> = ({children}) => {
  return (
    <>
      <Nav/>
      {children}
      <Footer/>
    </>
  )
}

export default Layout
