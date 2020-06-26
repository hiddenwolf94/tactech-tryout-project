const mongoose  = require('mongoose'),
      fetch     = require('node-fetch'),
      schema    = mongoose.Schema;

let characterSchema = new schema ({
    url: { type: String },
    name: { type: String },
    culture: { type: String },
    born: { type: String },
    died: { type: String },
    titles: { type: Array },
    aliases: { type: Array },
    father: { type: String },
    mother: { type: String },
    spouse: { type: String },
    allegiances: { type: Array },
    books: { type: Array },
    povBooks: { type: Array },
    tvSeries: { type: Array },
    playedBy: { type: Array }
},
  {
    collection: 'characters'
});

let charactersModel = mongoose.model('characters', characterSchema);

module.exports = charactersModel;