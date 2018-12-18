const express = require('express');
const router = express.Router();
const Movie = require('../models/movies');


router.get('/index', (req, res, next) => {
    Movie.find()
        .then(movies => res.render('movies', { movies })
        )
        .catch(err => console.log(`movies err = ${err}`)
        )
})

router.get('/show-m/:id', (req, res, next) => {
    let moviesId = req.params.id;

    Movie.findById(moviesId)
        .then(movies => {
            res.render("show-m", { movies })
        })
        .catch(err => {
            console.log(err)
        })
}
)

router.get('/new-m', (req, res, next) => {
    res.render("new-m");
});

router.post('/new-m', (req, res, next) => {

    const { title, genre, plot } = req.body;
    const newMovie = new Movie({ title, genre, plot });
    newMovie.save()

        .then(() => {
            res.redirect('/movies/index');
        })
        .catch((er) => {
            console.log(err)
        })
}
)


/* router.get('/index', (req, res, next) => {

}) */


module.exports = router;