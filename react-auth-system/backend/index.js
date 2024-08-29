var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var pool = require('./src/db');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var userRoutes = require('./src/routes/userRoutes'); // Import routes
var app = express();
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

// Connect routes
app.use('/api', userRoutes);

var PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
    console.log('Server running on port ' + PORT);
});
