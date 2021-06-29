import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Header from './components/Header'
import Announcements from './pages/Announcements'
import FAQs from './pages/FAQs'
import Home from './pages/Home'
import Inventory from './pages/Inventory'
import Orders from './pages/Orders'

export default function Routes() {
    return (
        <Router>
            <Header/>
            <div className="App">
                <header className="App-header">
                    <Switch>
                        <Route path="/Inventory">
                            <Inventory />
                        </Route>
                        <Route path="/Orders">
                            <Orders />
                        </Route>
                        <Route path="/FAQs">
                            <FAQs />
                        </Route>
                        <Route path="/Announcements">
                            <Announcements />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </header>
            </div>
        </Router>
    )
}