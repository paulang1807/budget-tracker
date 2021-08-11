const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');

dotenv.config({ path: './config/config.env' })

const transactions = require('./routes/transactions');
const accounts = require('./routes/accounts');
const merchants = require('./routes/merchants');

const connectDB = require('./config/db');

connectDB();

const app = express();

// Logger
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());  // Use BodyParser for processing data sent to api
app.use('/api/v1/transactions', transactions);
app.use('/api/v1/accounts', accounts);
app.use('/api/v1/merchants', merchants);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    // handle request to anything except the api routes
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold));