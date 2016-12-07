import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import { ValidatedMethod } from 'meteor/mdg:validated-method'

import { Games } from './collections'
import Promise from 'bluebird'

const makeMoveMethod = new ValidatedMethod({
    name: 'Games.makeMove',
    validate: () => { /* TODO */ },
    run({ from, to, mover }) {
        if (this.isSimulation && Session.get('disableOptimisticUI')) {
            // do no work on the client
            return
        }

        // allow for demoing of latency and errors
        if (Meteor.isServer) {
            if (to === 'f6' || Math.floor(Math.random() * 10) > 7) {
                Meteor.sleep(2500)
            }
            if (to === 'f6') {
                // Use Meteor.Error for application-defined errors
                throw new Meteor.Error('Moving to f6 raises an error, demoing UI rollback')
            }
        }

        // perform the Mongo update
        Games.update('games:demo', {
            $unset: {
                [`board.position.${from}`]: 1
            },
            $set: {
                [`board.position.${to}`]: mover
            }
        })
    }
})

export const makeMove = Promise.promisify(makeMoveMethod.call, { context: makeMoveMethod })

if (Meteor.isClient) {
    window.Session = Session
}
