'use strict';

var fs = require('fs');

/**
 * A function to handle uploads after a single file has been through the multer
 * middleware. We get the fie and save it to disk in the uploads folder.
 */
function uploadFile (req, res) {
    // Get where multer has stored it temperately.
    var tmp_path = req.file.path;

    // The original name of the uploaded file stored in the variable
    // "originalname". Lets save it with that name under uploads. Note uploads
    // with the same name will overwrite each other.
    var target_path = __dirname + '/../../uploads/' + req.file.originalname;

    // Here you could do all sorts of other things like rename the file to be
    // stored, validate it is OK (don't want no .exe files), store what user
    // uploaded the file etc etc.

    // For us we'll simply get the file and write it to the uploads folder as
    // it's original name.
    var src  = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);
    src.on('end', function() { res.send('Looks like that worked!'); });
    src.on('error', function(err) { res.send('Oh Noes! Somethings not right.'); });
}

module.exports = uploadFile;
