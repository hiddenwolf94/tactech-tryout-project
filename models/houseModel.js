const mongoose  = require('mongoose'),
      schema    = mongoose.Schema;

let houseSchema = new schema ({
    url: { type: String },
    name: { type: String },
    region: { type: String },
    coatOfArms: { type: String },
    words: { type: String },
    titles: { type: Array },
    seats: { type: Array },
    currentLord: { type: String },
    heir: { type: String },
    overLord: { type: String },
    founded: { type: String },
    founder: { type: String },
    diedOut: { type: String },
    ancestralWeapons: { type: Array },
    cadetBranches: { type: Array },
    swornMembers: { type: Array }
},
  {
    collection: 'houses'
});

let houseModel = mongoose.model('houses', houseSchema);

module.exports = houseModel;