/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter, Switch, Route, Link, useLocation } from 'react-router-dom'

import Home from './components/common/Home'
import FPShow from './components/fictionalprimates/FPShow'
import FPIndex from './components/fictionalprimates/FPIndex'
import FPAdd from './components/fictionalprimates/FPAdd'
import FPEdit from './components/fictionalprimates/FPEdit'

function App() {

  return (
    <BrowserRouter>
      <nav className="navbar is-success">
        <div className="container">
          <div className="navbar-menu">
            <div className="navbar-start">
              <Link to="/" className="navbar-item">Home</Link>
              <Link to="/fictionalprimates" className="navbar-item">Browse Fictional Primates</Link>
              <Link to="/fictionalprimates/new" className="navbar-item">Add Another</Link>
            </div>
          </div>
        </div>
      </nav>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/fictionalprimates/new" component={FPAdd} />
        <Route path="/fictionalprimates/:id/edit" component={FPEdit} />
        <Route path="/fictionalprimates/:id" component={FPShow} />
        <Route path="/fictionalprimates" component={FPIndex} />
      </Switch>
    </BrowserRouter>
  )
}

export default App