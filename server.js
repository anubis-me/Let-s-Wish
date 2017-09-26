var express       = require('express');           // Experss JS Framework
var app           = express();
var morgan        = require('morgan');            // Import Morgan Package
var port          = process.env.PORT||898;        // Setting Server Port
var mongoose      = require('mongoose');          // HTTP request logger middleware for Node.js
var bodyParser    = require('body-parser');       // (Middleware) Parses incoming request bodies in a middleware before your handlers
var router        = express.Router();             // Importing Router
var approutes     = require('./app/routes/api')(router); //call api from routes
var path          = require('path');              // Inbuilt

app.use(morgan('dev'));                             // Morgan Middleware
app.use(bodyParser.json());                         // Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.static(__dirname +'/public'));      // Allow front end to access public folder
app.use('/api',approutes);                          // Using api from routes folder in app(backend route)


app.get('*',function (req, res) {                   // Rendering the index page on the start of the server
    res.sendFile(path.join(__dirname+'/public/app/views/index.html'));
                                                    //'*' --> changes any path to index path
});

//------------------------ Database connection with server--------------------------------------
mongoose.connect('mongodb://abhinav3006gupta:Abhilash.guptaAb1998@ds040167.mlab.com:40167/wishes', function(err) {
    if (err) {
        console.log('Not connected to the database: ' + err); // Console msg if unable to connect to database
    } else {
        console.log('Successfully connected to MongoDB');     // Console meg if able to connect to database
    }
});

//Start of a server
app.listen(port,function() {                                // Server is working on this port config
    console.log('Running the server on port ' + port);
});