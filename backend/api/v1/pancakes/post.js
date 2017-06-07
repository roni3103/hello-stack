'use strict';

let Promise = require('promise');
let _       = require('lodash');

// Docs
// ----
//
// This module contains the code to handle a request for creating a new pancake
// and saving it to a database collection. There are many ways to go about this
// and some warning much of this is personal preference because of that. However
// everything is personal preference gained over time and with reasoning so I do
// recommend following this structure or at the very least the reasonings behind
// it.
//
// The end result of any module for this endpoint should be a function that
// takes 2 arguments "req" and "res" (request/response) and responds when the
// pancake is saved a success or error status code and body depending on how
// things went. Everything else is preference.
//
// This module heavily builds on breaking out logic into functions that return
// promises so the final function we export is simply a chain of steps to do.
// This could be done with callbacks or whatever you like but promises make
// breaking this logic down into a list of steps clearer if done right (the last
// function is a list of x then y the z). It's also pretty easy to test each
// individual step in a similar way as each is a promise which either succeeds
// or fails depending on input.

/**
 * Checks the body for our API request to see if it has all the details we need
 * to save a new pancake.
 */
function validateParams (data) {
    return new Promise(function (resolve, reject) {
        let pancake = _.get(data, 'req.body.pancake', {});
        let errors  = [];

        // validate our request (all pancakes need a name)
        if (!pancake.name) {
            errors.push({
                title: 'Invalid Attribute',
                detail: 'Pancake name is required.'
            })
        }

        // if errors lets bottle out
        if (errors.length) {
            // return so we don't call the rest of our code and reject so
            // promise chain stops as the request wasn't valid
            return reject({
                status: 400,
                errors: errors
            });
        }

        // add our validated pancake to object we pass through the promise chain
        data.pancake = pancake;

        // everything looks good so lets resolve this promise
        resolve(data);
    });
}

/**
 * Function to save a pancake to the database.
 */
function savePancake (data) {
    return new Promise(function (resolve, reject) {
        let pancake = _.get(data, 'pancake'); // the previous validate function will have added our validated pancake
        let db      = _.get(data, 'req.db');  // our middleware adds db to every req object

        // create the pancake
        db.collection('pancakes').insertOne(pancake,
        function (err) {
            if (err) {
                // log the error for us to see but lets give a more generic
                // response to the user
                console.error(err);
                reject({
                    status: 500,
                    errors: [{
                        title: 'Internal Error',
                        detail: 'Failed to save pancake to DB.'
                    }]
                });
                return;
            }

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
 */
function sendSuccessResponse (data) {
    let res = _.get(data, 'res');
    let response = {
        pancake: _.get(data, 'pancake', {})
    };

    res.status(200).json(response);
}

/**
 * This is the function we end up exporting. So this is the method we call when
 * our endpoint for creating pancakes is hit. It uses the methods above to
 * separate logic but these aren't directly accessible when this module is
 * required only this function is exported using `module.exports = ...`.
 */
function createPancake (req, res) {
    return validateParams({ req: req, res: res })
        .then(savePancake)
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
                // look at `validateParams` where we reject when there is no
                // pancake title or when DB insert fails in `savePancake`.
                return res.status(err.status).json({
                    errors: err.errors
                });
            }

            // generic 500 error as we are not sure what happened. This could be
            // an error thrown by another library or a syntax errors we missed.
            // Who knows but we should send something and take a look at the
            // logs to find out more.
            console.error(err);
            res.status(500).json({
                errors: [{
                    title: 'Internal Error',
                    detail: 'Unknown error'
                }]
            });
        });
}

module.exports = createPancake;
