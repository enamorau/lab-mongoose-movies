const express = require('express');
const router = express.Router();
const Movie = require('../models/movies');
const Celebrity = require('../models/celebrity');


// get and render render movies index

router.get('/index', (req, res, next) => {
    Movie.find()
        .then(movies => res.render('movies', { movies })
        )
        .catch(err => console.log(`movies err = ${err}`)
        )
})

// get and render movie details + populate list of actors with celebrities db when linked

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

// get and render new movie details

router.get('/new-m', (req, res, next) => {
    res.render("new-m");
});

// send data from the body into Movie database

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

// delete a movie from the DB

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

// get and render edit movie page

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

// send data from the body to the db in order to edit a movie

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


/* 

Add a realtionship between two databases below 
                       |
                       |
                       v  
                                                                                                                   
 */



// add an actor inside the "show details" of a movie -->  get and render page to add actor


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

// post data to celeb DB + link celeb with actors field in movies DB --> redirect to index

router.post('/show-m/:id/add-celeb/', (req, res, next) => {

    const { name, occupation, catchPhrase } = req.body;
    const newCelebrity = new Celebrity({ name, occupation, catchPhrase });
    newCelebrity.save()

        .then((celeb) => {

            Movie.update({ _id: req.params.id }, { $push: { actors: celeb._id } })
                .then(() => {
                    res.redirect('/movies/index');
                })

        })
        .catch((error) => {
            console.log(error);
            next(err)
        })
});

module.exports = router;