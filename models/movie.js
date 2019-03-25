const mongoose = require('mongoose');
//Define Schema
var movieSchema = mongoose.Schema({
    id: { type: Number },
    title: { type: String, required: true },
    year: { type: Number },
    genres: { type: Array },
    ratings: { type: Array },
    poster: { type: String },
    contentRating: { type: Number },
    duration: { type: String },
    releaseDate: { type: Date },
    averageRating: { type: Number },
    originalTitle: { type: String },
    storyline: { type: String },
    actors: { type: Array },
    imdbRating: { type: Number },
    posterurl: { type: String }
});

const Movie = module.exports = mongoose.model('Movie', movieSchema);

//Count movies
module.exports.countMovies = function(callback, criteria){
    Movie.countDocuments({});
};
//Get Movies
module.exports.getMovies = function(callback, limit){
    Movie.find(callback).limit(limit);
};