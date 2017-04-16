var express     = require('express');
var cors        = require('cors');
var MongoClient = require('mongodb').MongoClient;
var app         = express();

// Note: Anything we run here will run only once when we start the backend. This
// is good for setting up our API routes and what functions they call or middle
// ware which we only want to do once and not on every request.

// Add the cross origin middle ware. This will add the required headers to our
// requests and responses for CORS to work. We need this as our front end runs
// on localhost:9000 and the API on localhost:9001 (essentially different
// domains) so browsers can block requests from our front end to the API for
// security reasons.
app.use(cors({
    origin: 'http://localhost:9000' // requests from our front end are ok (anywhere else seems sketchy)
}));

// Create a database variable outside of the database connection callback to
// reuse the connection pool in your app.
var db;

// for all our endpoints that are hit add our own middle ware that adds a
// reference to the db variable we set in our database connection callback. We
// do this because we only want to make a connection to our database when the
// application (backend) starts once. Then all hits to our endpoint can use the
// same connection to make their queries. This saves us making a new connection
// each time which is much slower and harder for a mongo instance to handle.
//
// https://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html#mongoclient-connection-pooling
//
// Now any endpoint has access to the db connection via `req.db`. Note while the
// mongo client prefers connect to only be called once other Databases and their
// clients may not so be sure to check. For example Amazons dynamo DB is
// accessed by a REST API so each connection is essentially a new one. This is
// great for serverless architecture but thats out of scope for this example.
app.use(function (req, res, next) {
    // pass db in request to all other handlers
    req.db = db;

    next();
});

// Now setup our routes (API endpoints) and the functions they call. We could
// also setup a statics folder to serve front end assets but for this stack
// we'll keep the frontend and backend separate and decoupled which is usually a
// good practice.

/**
 * An endpoint that simply returns the date and time for the server.
 */
app.get('/api/v1/time', function (req, res) {
    res.send(new Date());
});

// Before we start our server (API) we create a connection to out Mongo DB. If
// that fails we don't bother starting the server (after all nothing will really
// work if we can't get data from our database). Once we have a connection we
// start the express server using `app.listen`.
var connectString = 'mongodb://localhost:27017/hello-stack';

MongoClient.connect(connectString, function (err, database) {
    // connection failed so give up on life
    if (err) {
        log.error(err);
        process.exit(1);
    }

    // Save database object from the callback for reuse. See how we use `db` in
    // our middeware further up
    db = database;

    // Finally the setup is done but we haven't started our server yet so lets
    // do that. The second argument for `app.listen` is a function which gets
    // called when the server is ready to receive requests. This doesn't happen
    // instantly so we can use the callback to call code that is dependent on
    // our server being ready. For this example we just log that everything is
    // good to go.
    app.listen(9001, function () {
        console.log('Example app listening on port 3001!')
    });
});
