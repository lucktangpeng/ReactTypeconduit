import React from 'react'
import {
  HashRouter,
  Switch,
  Route
} from "react-router-dom";
import Home from './views/home'
import Login from './views/login/Login';
import User from './views/user/User'
import Article from './views/article/Article'
const Router = () => {
  return (
    <>
      <HashRouter>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/regist">
            <Login />
          </Route>
          <Route path="/login">
            <Login status={true} />
          </Route>
          <Route path="/editor">
            <Login />
          </Route>
          <Route path="/userInfo/:user">
            <User />
          </Route>
          <Route path="/article/:slug">
            <Article />
          </Route>
        </Switch>
      </HashRouter>
    </>
  )
}

export default Router
