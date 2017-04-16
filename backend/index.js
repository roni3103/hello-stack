var express = require('express');
var cors    = require('cors');
var app     = express();

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

// Finally the setup is done but we haven't started our server yet so lets do
// that. The second argument for `app.listen` is a function which gets called
// when the server is ready to receive requests. This doesn't happen instantly
// so we can use the callback to call code that is dependent on our server being
// ready. For this example we just log that everything is good to go.
app.listen(9001, function () {
    console.log('Example app listening on port 3001!')
});