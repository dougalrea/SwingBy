import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'


import SignUpLogIn from './components/common/SignUpLogIn'
import PeopleIndex from './components/people/PeopleIndex'
import ProfileShow from './components/people/ProfileShow'
import EventsIndex from './components/events/EventsIndex'
import EventShow from './components/events/EventShow'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SignUpLogIn} />
        <Route path="/people/:id" component={ProfileShow} />
        <Route path="/people" component={PeopleIndex} />
        <Route path="/events/:id" component={EventShow} />
        <Route path="/events" component={EventsIndex} />
      </Switch>
    </BrowserRouter>
  )
}

export default App