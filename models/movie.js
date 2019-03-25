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

var Movie = mongoose.model('Movie', movieSchema);

//Count movies
module.exports.countMovies = function (callback) {
    Movie.countDocuments(function (error, count) {
        if (error) {
            callback(0);
        }
        callback(count);
    });
};

//Get Movies
module.exports.getMovies = function (limit, callback) {
    //Movie.find(callback).limit(limit);

    Movie.find(function (error, docs) {
        if (error) {
            callback(null);
        }
        callback(docs);
    }).limit(limit);
};

//Get Movie By Id
module.exports.getMovieById = function (movieId, callback) {
    Movie.findOne({ id: movieId }, function (err, movie) {
        if (err) {
            callback(null);
        }
        callback(movie);
    });
};