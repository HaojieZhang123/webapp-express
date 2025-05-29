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

    // query
    const movieSql = 'SELECT * FROM movies WHERE id = ?';
    const reviewSql = 'SELECT * FROM reviews WHERE movie_id = ?';

    // execute query
    connection.query(movieSql, [id], (err, movie) => {
        if (err) throw err;

        // get reviews
        connection.query(reviewSql, [id], (err, reviews) => {
            if (err) throw err;

            // add reviews to movie
            movie[0].reviews = reviews;

            // send movie data
            res.send(movie);
        })
    })
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