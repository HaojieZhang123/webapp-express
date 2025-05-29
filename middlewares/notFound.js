const notFound = (req, res, next) => {
    res.status(404).send({
        error: 'Not Found',
        message: 'Route not found'
    });
}


module.exports = notFound;