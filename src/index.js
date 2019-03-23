import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './components/Auth/Login/Login'
import Register from './components/Auth/Register/Register'
import Header from './components/Header'
import Body from './components/Home/Body'
import './index.css'
import OfferARide from './components/TripCreator/TripCreator'
import TripsList from './components/TripList/TripList.js'
import DetailsView from './components/TripDetails/DetailsView.js';
import Profile from './components/Profile/Profile';


render((
  <BrowserRouter>
    <div style={{backgroundColor:"#efefef",minHeight: "100vh"}}>
        <Header />
        <Switch>
          <Route exact path='/' component={Body}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route path='/TripCreator' component={OfferARide}/>
          <Route path='/TripDetails' component={DetailsView}/>
          <Route path='/tripsList' component={TripsList}/>
          <Route path='/Profile' component={Profile}/>
        </Switch>
    </div>
  </BrowserRouter>
  
), document.getElementById('root'))
