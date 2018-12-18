const mongoose = require('mongoose')
const Celebrity = require('../models/celebrity')
const Movie = require('../models/movies')

Celebrity.collection.drop();
Movie.collection.drop();

const dbName = 'celebrity-DB'

const celebrities = [
    {
        name: "Popeye",
        occupation: "biceps curl",
        catchPhrase: "get me some spinach !",
    },
    {
        name: "bond",
        occupation: "giving his name followed by his first name with his name again",
        catchPhrase: "bond, james bond",
    },
    {
        name: "unknown",
        occupation: "nothing",
        catchPhrase: "void",
    }

]


const movies = [
    {
        title: "Alice in answerland",
        genre: "documentary",
        plot: "Alice looking everywhere for answers",
    },
    {
        title: "006",
        genre: "genre",
        plot: "A 5 hour long introspection on being one number short from being 007 ",
    },
    {
        title: "never shot",
        genre: "undefined",
        plot: "void",
    }

]




mongoose.connect(`mongodb://localhost/${dbName}`)
    .then(() => {
        
        const celebs = Celebrity.create(celebrities)
        const films = Movie.create(movies)

        Promise.all([celebs, films])

            .then(tab => {
                console.log(`inserted ${tab[0].length} celebrities & ${tab[1].length} movies`)
                mongoose.disconnect()
            }
            )
            .catch(err => console.error(err))
    })