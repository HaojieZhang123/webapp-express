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
    const movieSql = 'SELECT movies.*, AVG(reviews.vote) AS vote FROM movies JOIN reviews ON movies.id = reviews.movie_id WHERE movies.id = ? GROUP BY movies.id';
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
    // get data
    const { title, director, genre, release_year, abstract, image } = req.body;

    // get image name
    const imageName = req.file.filename;

    // query
    const sql = 'INSERT INTO movies (title, director, genre, release_year, abstract, image) VALUES (?, ?, ?, ?, ?, ?)';

    // execute query
    connection.query(sql, [title, director, genre, release_year, abstract, imageName], (err, response) => {
        if (err) throw err;

        res.status(201).send({
            status: 'success',
            message: 'Movie stored successfully'
        });
    })
}

// review post
const reviewStore = (req, res) => {
    // get id
    const { id } = req.params;
    // get data
    const { name, vote, text } = req.body;

    // query
    const sql = 'INSERT INTO reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?)';

    // execute query
    connection.query(sql, [id, name, vote, text], (err, response) => {
        if (err) throw err;

        res.status(201).send({
            status: 'success',
            message: 'Review stored successfully'
        });
    })
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
    reviewStore,
    update,
    modify,
    destroy
}