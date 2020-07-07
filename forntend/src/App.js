import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import AuthContext from './context/AuthContext'
import AuthPage from './pages/Auth'
import BookingsPage from './pages/Bookings'
import EventsPage from './pages/Events'
import MainNavigation from './components/Navigation/MainNavigation'

import './App.css'

class App extends Component {
  state = {
    token: '',
    userId: '',
    tokenExpiration: '',
  }
  login = (token, userId, tokenExpiration) => {
    this.setState({
      token,
      userId,
      tokenExpiration,
    })
  }
  logout = () => {}
  render() {
    const { token, userId } = this.state
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: token,
              userId: userId,
              login: this.login,
              logout: this.logout,
            }}
          >
            <MainNavigation />
            <main className='main-content'>
              <Switch>
                {!token && <Redirect from='/' to='/auth' exact />}
                {!token && <Route path='/auth' component={AuthPage} />}
                {token && <Redirect from='/auth' to='/events' exact />}
                {!token && <Redirect from='/bookings' to='/auth' exact />}
                {token && <Redirect from='/' to='/events' exact />}
                {!token && <Route path='/auth' component={AuthPage} />}
                <Route path='/events' component={EventsPage} />
                {token && <Route path='/bookings' component={BookingsPage} /> }
              </Switch>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}

export default App
