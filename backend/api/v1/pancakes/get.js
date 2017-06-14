'use strict';

let Promise = require('promise');
let _       = require('lodash');
let log = require('../../../util/log');

// Docs
// ----
//
// This module contains the code to handle a request for getting all pancakes
// stored in the database. There are many ways to go about this and some warning
// much of this is personal preference because of that. However everything is
// personal preference gained over time and with reasoning so I do recommend
// following this structure or at the very least the reasonings behind it.
//
// The end result of any module for this endpoint should be a function that
// takes 2 arguments "req" and "res" (request/response) and responds when the
// pancakes have been fetched with the data or an error depending on how the
// database read went.
//
// This module heavily builds on breaking out logic into functions that return
// promises so the final function we export is simply a chain of steps to do.
// This could be done with callbacks or whatever you like but promises make
// breaking this logic down into a list of steps clearer if done right (the last
// function is a list of x then y the z). It's also pretty easy to test each
// individual step in a similar way as each is a promise which either succeeds
// or fails depending on input.

/**
 * @returns {Promise} Promise resolved when pancakes returned from db
 * @param {Object} data dependencies for getting pancakes from db
 */
function getPancakesFromDb (data) {
    return new Promise(function (resolve, reject) {
        // our middleware adds db to every req object
        let db = _.get(data, 'req.db');

        // create the pancake
        db.collection('pancakes').find({}).toArray(function (err, result) {
            if (err) {
                // log the error for us to see but lets give a more generic
                // response to the user
                log.error(err);
                reject({
                    status: 500,
                    errors: [ {
                        title: 'Internal Error',
                        detail: 'Failed to get pancakes from DB.'
                    } ]
                });
                return;
            }

            // we have our pancakes so add them to object we pass through the
            // promise chain so we can send them in our API response.
            data.pancakes = result;

            // Save went well resolve :D
            resolve(data);
        });
    });
}

/**
 * Very basic 200 response for successes. While this response is very basic in
 * others we may want to manipulate data before we send it in the response. For
 * that reason it's a nice idea to separate business logic before the response
 * and the sending of the response.
 * @param {Object} data dependencies for sending response
 * @returns {void}
 */
function sendSuccessResponse (data) {
    let res = _.get(data, 'res');
    let response = {
        pancakes: _.get(data, 'pancakes', [])
    };

    res.status(200).json(response);
}

/**
 * This is the function we end up exporting. So this is the method we call when
 * our endpoint for getting pancakes is hit. It uses the methods above to
 * separate logic but these aren't directly accessible when this module is
 * required only this function is exported using `module.exports = ...`.
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @returns {Promise} promise resolved when the pancake response is sent
 */
function getPancakes (req, res) {
    return getPancakesFromDb({ req, res })
        .then(sendSuccessResponse)
        .catch(function (err) {
            // Note: we don't separate this function like we did the ones above.
            // This is because while we can reject promises up the chain with
            // the res object if a syntax error or error we didn't expect and
            // reject ourselves occurs res wont be passed to it. Instead we rely
            // on the res being in scope from the parent `createPancake` method
            // instead of passing it as an parameter.

            if (err.status && err.errors) {
                // we know how to handle this error as this looks like we
                // rejected with a set status and errors to respond with. Take a
                // look at `getPancakes` where we reject when the DB find fails.
                return res.status(err.status).json({
                    errors: err.errors
                });
            }

            // generic 500 error as we are not sure what happened. This could be
            // an error thrown by another library or a syntax errors we missed.
            // Who knows but we should send something and take a look at the
            // logs to find out more.
            log.error(err);
            res.status(500).json({
                errors: [ {
                    title: 'Internal Error',
                    detail: 'Unknown error'
                } ]
            });
        });
}

module.exports = getPancakes;
