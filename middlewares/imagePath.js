const imagePath = (req, res, next) => {
    req.imagePath = `${req.protocol}://${req.get('host')}/imgs/movies/`;
    next();
}

module.exports = imagePath;