const express = require('express');
const router = express.Router();
const Celebrity = require('../models/celebrity');
const Movie = require('../models/movies');


router.get('/index', (req, res, next) => {
    Celebrity.find()
        .then(celebrities => {
            res.render('celebrities', { celebrities })
        })
        .catch(err => {
            console.log(`celebrities err = ${err}`)
        })
})

router.get('/show/:id', (req, res, next) => {
    let celebrityId = req.params.id;

    Celebrity.findById(celebrityId).populate("movies")
        .then(celebrity => {
            res.render("show", { celebrity })
        })
        .catch(err => {
            console.log(err)
        })
}
)

router.get('/new', (req, res, next) => {
    res.render("new");
});

//add new celebrity

router.post('/new', (req, res, next) => {

    const { name, occupation, catchPhrase } = req.body;
    const newCelebrity = new Celebrity({ name, occupation, catchPhrase });
    newCelebrity.save()

        .then(() => {
            res.redirect('/celebrities/index');
        })
        .catch((er) => {
            console.log(err)
        })
}
)

router.post('/:id/delete', (req, res, next) => {

    Celebrity.findByIdAndRemove(req.params.id)

        .then(() => {
            res.redirect('/celebrities/index');
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })
}
)


router.get('/:id/edit/', (req, res, next) => {
    const celebrityId = req.params.id
    Celebrity.findById(celebrityId)

        .then((celebrity) => {
            res.render("edit", { editCeleb: celebrity });
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })
}
)

router.post('/:id/edit/', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.update({ _id: req.params.id }, { $set: { name, occupation, catchPhrase } })
        .then(() => {
            res.redirect('/celebrities/index');
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



// add a movie inside the "show details" of a celebrity -->  get and render page to add movie


router.get('/show/:id/add-movie/', (req, res, next) => {
    const celebId = req.params.id
    console.log(celebId)


    Celebrity.findById(celebId)

        .then((celeb) => {
            res.render("add-movie", { addMovie: celeb });
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })
}
)

// post data to celeb DB + link celeb with actors field in movies DB --> redirect to index

router.post('/show/:id/add-movie/', (req, res, next) => {

    const { title, genre, plot } = req.body;
    const newMovie = new Movie({ title, genre, plot });
    newMovie.save()

        .then((movie) => {

            Celebrity.update({ _id: req.params.id }, { $push: { movies: movie._id } })
                .then(() => {
                    res.redirect('/celebrities/index');
                })

        })
        .catch((error) => {
            console.log(error);
            next(err)
        })
});


module.exports = router;