const express = require('express');
const router = express.Router();
const Movie = require('../models/movies');
const Celebrity = require('../models/celebrity');


router.get('/index', (req, res, next) => {
    Movie.find()
        .then(movies => res.render('movies', { movies })
        )
        .catch(err => console.log(`movies err = ${err}`)
        )
})

router.get('/show-m/:id', (req, res, next) => {
    let moviesId = req.params.id;

    Movie.findById(moviesId).populate("actors")
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


router.post('/:id/delete', (req, res, next) => {

    Movie.findByIdAndRemove(req.params.id)

        .then(() => {
            res.redirect('/movies/index');
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })
}
)


router.get('/:id/edit-movies/', (req, res, next) => {
    const movieId = req.params.id
    Movie.findById(movieId)

        .then((movie) => {
            res.render("edit-movies", { editMovie: movie });
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })
}
)

router.post('/:id/edit-movies/', (req, res, next) => {
    const { title, genre, plot } = req.body;
    Movie.update({ _id: req.params.id }, { $set: { title, genre, plot } })
        .then(() => {
            res.redirect('/movies/index');
        })
        .catch((error) => {
            console.log(error);
        })
});


/* router.get('/index', (req, res, next) => {

}) */


router.get('/show-m/:id/add-celeb/', (req, res, next) => {
    const movieId = req.params.id
    console.log(movieId)


    Movie.findById(movieId)

        .then((movie) => {
            res.render("add-celeb", { addCeleb: movie });
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })
}
)

router.post('/show-m/:id/add-celeb/', (req, res, next) => {

    const { name, occupation, catchPhrase } = req.body;
    const newCelebrity = new Celebrity({ name, occupation, catchPhrase });
    newCelebrity.save()

        .then((celeb) => {

            Movie.update({ _id: req.params.id }, { $push: { actors : celeb._id } })
            .then(()=>{
                res.redirect('/movies/index');
            }) 
            
        })
        .catch((error) => {
            console.log(error);
            next(err)
        })
});

module.exports = router;