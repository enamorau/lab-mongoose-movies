const mongoose = require('mongoose')
const Celebrity = require('../models/celebrity')

const dbName = 'celebrity-DB'
mongoose.connect(`mongodb://localhost/${dbName}`);


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

Celebrity.create(celebrities)
    .then(
        () => {
            console.log(`Created ${celebrities.length} celebrities`)
            mongoose.connection.close()
        }
    )
    .catch(err => { throw (err) }
    )

