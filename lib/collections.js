import { Mongo } from 'meteor/mongo'
// Both environments-client (browser/native) and server- get this collection
// On the client:
//     Websocket messages change the contents of this collection over time
// On the server:
//     Method calls change its contents, these changes will be published to
//     those clients who have subscribed
export const Games = new Mongo.Collection('Games')

// A factory function for seeding
export const newGame = () => ({
    board: {
        position: {
            a8: 'bR', b8: 'bN', c8: 'bB', d8: 'bQ', e8: 'bK', f8: 'bB', g8: 'bN', h8: 'bR',
            a7: 'bP', b7: 'bP', c7: 'bP', d7: 'bP', e7: 'bP', f7: 'bP', g7: 'bP', h7: 'bP',
            a2: 'wP', b2: 'wP', c2: 'wP', d2: 'wP', e2: 'wP', f2: 'wP', g2: 'wP', h2: 'wP',
            a1: 'wR', b1: 'wN', c1: 'wB', d1: 'wQ', e1: 'wK', f1: 'wB', g1: 'wN', h1: 'wR'
        }
    }
})

