// import connection
const connection = require('../data/db');

const index = (req, res) => {
    connection.query('SELECT * FROM movies', (err, response) => {
        if (err) throw err;

        // modify image path with complete path
        const movies = response.map((movie) => {
            const obj = { ...movie, }
            obj.image = req.imagePath + obj.image

            return obj;
        })

        res.send(movies);
    })
}

const show = (req, res) => {
    // get id
    const id = req.params.id;

    // query
    const movieSql = 'SELECT * FROM movies WHERE id = ?';
    const reviewSql = 'SELECT * FROM reviews WHERE movie_id = ?';

    // execute query
    connection.query(movieSql, [id], (err, response) => {
        if (err) throw err;

        // check if movie exists
        if (response.length === 0 || !response) {
            return res.status(404).send({
                error: 'Not Found',
                message: 'Movie not found'
            })
        }


        // get reviews
        connection.query(reviewSql, [id], (err, reviews) => {
            if (err) throw err;

            // add reviews to movie
            response[0].reviews = reviews;

            // send movie data
            res.send({
                ...response[0],
                image: req.imagePath + response[0].image
            });
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