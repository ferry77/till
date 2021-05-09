import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom'
import './App.css'
import Customers from './pages/Customers'
import Merchants from './pages/Merchants'

function App() {
  return (
    <Router>
      <nav className="navbar" role="navigation">
        <Link className="navbar-item" to="/customers">
          Customers
        </Link>
        <Link className="navbar-item" to="/merchants">
          Merchants
        </Link>
      </nav>

      <Switch>
        <Route path="/customers">
          <Customers />
        </Route>
        <Route path="/merchants">
          <Merchants />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
