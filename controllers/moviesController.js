// import connection
const connection = require('../data/db');

const index = (req, res) => {
    connection.query('SELECT * FROM movies', (err, results) => {
        if (err) throw err;
        res.send(results);
    })
}

const show = (req, res) => {
    // get id
    const id = req.params.id;

    res.send(`This is the show page. ID: ${id}`);
}

const store = (req, res) => {
    res.send('This is the store page');
}

const update = (req, res) => {
    res.send('This is the update page');
}

const modify = (req, res) => {
    res.send('This is the modify page');
}

const destroy = (req, res) => {
    res.send('This is the destroy page');
}

module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
}