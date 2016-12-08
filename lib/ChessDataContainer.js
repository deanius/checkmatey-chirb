import { Bert } from 'meteor/themeteorchef:bert'
import React from 'react'
import { connect, Provider } from 'react-redux'
import { Route, Router, browserHistory } from 'react-router'
import ChessGame from './ChessGame'
import { makeMove } from './api'
import { getStore } from './store'
import './pubsub'

const store = getStore('games:demo')
if (Meteor.isClient) {
    window.store = store
}


const selectState = state => state
// AKA mapDispatchToProps - dont need dispatch if you call a Meteor method
const createHandlers = () => ({
    dropHandler: (from, to, mover) => {
        makeMove({ from, to, mover })
            .catch(err => {
                Bert.alert({ title: 'Error', message: err.error, type: 'danger', style: 'fixed-top' })
            })
    }
})

const ChessDataContainer = connect(selectState, createHandlers)(ChessGame)

export default (
<Provider store={store}>
    <Router history={browserHistory}>
        <Route>
            <Route path="/" component={ ChessDataContainer } />
        </Route>
    </Router>
</Provider>
)