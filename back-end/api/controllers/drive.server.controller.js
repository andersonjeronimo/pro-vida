var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

var mime = require('mime');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/drive-nodejs-quickstart.json
var SCOPES = [
    'https://www.googleapis.com/auth/drive.metadata',
    'https://www.googleapis.com/auth/drive.photos.readonly',
    //'https://www.googleapis.com/auth/drive.readonly',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file'
];

var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'drive-nodejs-quickstart.json';

exports.get_id = function (req, res, next) {
    console.log(req.params.id);
    return req.params.id;
};

exports.read = function (req, res, next) {
    // Load client secrets from a local file.
    fs.readFile('./api/controllers/client_secret.json', function processClientSecrets(err, content) {
        if (err) {
            //console.log('Error loading client secret file: ' + err);
            //return;
            return next('Error loading client secret file: ' + err);
        }
        // Authorize a client with the loaded credentials, then call the
        // Drive API.
        authorize(JSON.parse(content), getFile, req, res, next);
    });
};

exports.read_files = function (req, res, next) {
    // Load client secrets from a local file.
    fs.readFile('./api/controllers/client_secret.json', function processClientSecrets(err, content) {
        if (err) {
            //console.log('Error loading client secret file: ' + err);
            //return;
            return next('Error loading client secret file: ' + err);
        }
        // Authorize a client with the loaded credentials, then call the
        // Drive API.
        authorize(JSON.parse(content), listFiles, req, res, next);
    });
};

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback, req, res, next) {
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, function (err, token) {
        if (err) {
            getNewToken(oauth2Client, callback);
        } else {
            oauth2Client.credentials = JSON.parse(token);
            callback(oauth2Client, req, res, next);
        }
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
    var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Enter the code from that page here: ', function (code) {
        rl.close();
        oauth2Client.getToken(code, function (err, token) {
            if (err) {
                console.log('Error while trying to retrieve access token', err);
                return;
            }
            oauth2Client.credentials = token;
            storeToken(token);
            callback(oauth2Client);
        });
    });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
    try {
        fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
        if (err.code != 'EEXIST') {
            throw err;
        }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token));
    console.log('Token stored to ' + TOKEN_PATH);
}

/**
 * Lists the names and IDs of up to 10 files.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listFiles(auth, req, res, next) {
    var service = google.drive('v3');
    var files = [];
    service.files.list({
        auth: auth,
        //pageSize: 10,
        fields: "nextPageToken, files(id, name)"
    }, function (err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return next('The API returned an error: ' + err);
        } else {
            files = response.files;
            if (files.length == 0) {
                console.log('No files found.');
            }
            return res.json(files);
        }
    });

}

/**
 * Download a file from Google Drive.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function getFile(auth, req, res, next) {
    var drive = google.drive('v3');
    //var file = null;
    var fileId = req.params.id;

    drive.files.get({
        auth: auth,
        fileId: fileId
    }, function (err, metadata) {
        if (err) {
            console.error('The API returned an error: ' + err);
            return next('The API returned an error: ' + err);
            //return process.exit();
        }

        console.log('Downloading %s...', metadata.name);

        var file = '/tmp/' + metadata.name;

        //var dest = fs.createReadStream(file);
        var dest = fs.createWriteStream(file);

        var _mimetype = mime.lookup(file);
        console.log(_mimetype);

        drive.files.get({
            auth: auth,
            fileId: fileId,
            alt: 'media',
            mimeType: _mimetype
        }).on('error', function (err) {
            console.log('Error downloading file', err);
            process.exit();
        }).pipe(dest);

        dest.on('finish', function () {
            console.log('Downloaded %s!', metadata.name);
            process.exit();
        }).on('error', function (err) {
            console.log('Error writing file', err);
            process.exit();
        });
    });
}