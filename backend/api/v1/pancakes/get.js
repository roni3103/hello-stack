'use strict';

let Promise = require('promise');
let _       = require('lodash');
let log = require('../../../util/log');
let ObjectID = require('mongodb').ObjectID;



/**
 * Method to pull a single pancake from database
 * @param  {Object} data dependencies for getting pancake from the db
 * @return {Promise}      resolved when pancake is retrieved
 */
function getPancakeFromDb (data) {

    return new Promise(function ( resolve, reject ) {
        // our middleware adds db to every req object
        let db = _.get(data, 'req.db');
        let pancakeId = _.get(data, 'req.params.id');

        // create the pancake
        db.collection('pancakes').findOne({ _id: new ObjectID(pancakeId)}, function (err, result) {
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
            data.pancake = result;

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
    let pancake = _.get(data, 'pancake',{});
    let res = _.get(data, 'res');
    let response = {
        pancake
    };

    res.status(200).json(response);
}
/**
 * [getPancake description]
 * @param  {Object} req request object
 * @param  {Object} res response object
 * @return {Promise}     resolved when request is complete
 */
function getPancake (req, res) {
    return getPancakeFromDb({ req, res })
        .then(sendSuccessResponse)
        .catch(function (err) {
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

module.exports = getPancake;
