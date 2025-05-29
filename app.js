const express = require('express');
const app = express();
const port = process.env.SERVER_PORT || 3000;

// routers
const moviesRouter = require('./routers/moviesRouter');

// use public folder
app.use(express.static('public'));
// send responses as json
app.use(express.json());

// base route
app.get('/', (req, res) => {
    res.send('Movies API entry point');
});

app.use('/api/movies', moviesRouter);

// start the Express server
app.listen(port, () => {
    console.log(`server started at port: ${port}`);
});

