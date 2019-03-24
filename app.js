const express = require('express');
const Joi = require('joi');
const vidflixDb = require('./vidflixDb');
const vidflixApi = express();

const moviesList = vidflixDb.movies;

var i = 1;
for (var i in moviesList) {
    moviesList[i].id = parseInt(i) + 1;
}

//Get all movies
vidflixApi.get('/api/v1/movies', (req, res) => {
    let movies = {
        "total": moviesList.length,
        "movies": moviesList.slice(0, 9)
    };
    res.status(200).contentType('application/json').send(movies);
});
//Get movie by Id
vidflixApi.get('/api/v1/movies/:id', (req, res) => {
    var id = parseInt(req.params.id); //Type casting 'id' into integer
    let queryParams = req.query;
    //res.send(queryParams);
    const movie = moviesList.find(movie => movie.id === id);

    if (!movie)
    {
        res.status(404).send("Movie with given ID is not found."); //404 Not Found
        return;
    }
    res.send(movie);
});

//Adding a new movie
vidflixApi.use(express.json()); //Middleware to parse request body

vidflixApi.post('/api/v1/movies', (req, res) => {
    const validationResult = validateMovie(req.body);
    if (validationResult.error) {
        res.status(400).send(validationResult.error.details); //400 Bad Request
        return;
    }

    const newMovie = {
        "id": moviesList.length + 1,
        "title": req.body.title,
        "year": req.body.year,
        "genres": req.body.genres,
        "ratings": req.body.ratings,
        "poster": req.body.poster,
        "contentRating": req.body.contentRating,
        "duration": req.body.duration,
        "releaseDate": req.body.releaseDate,
        "averageRating": req.body.averageRating,
        "originalTitle": req.body.originalTitle,
        "storyline": req.body.storyline,
        "actors": req.body.actors,
        "imdbRating": req.body.imdbRating,
        "posterurl": req.body.posterurl
    };
    moviesList.push(newMovie);
    //return created entity
    res.status(200).send(newMovie);
});

vidflixApi.put('/api/v1/movies/:id', (req, res) => {
    var id = parseInt(req.params.id); //Type casting 'id' into integer
    const movie = moviesList.find(movie => movie.id === id);
    if (!movie){
        res.status(404).send("Movie with given ID is not found."); //404 Not Found
        return;
    }
    const validationResult = validateMovie(req.body);
    if (validationResult.error) {
        res.status(400).send(validationResult.error.details); //400 Bad Request
        return;
    }
    //Update
    movie.title = req.body.title;
    res.send(movie);
});

vidflixApi.delete('/api/v1/movies/:id', (req, res) => {
    var id = parseInt(req.params.id); //Type casting 'id' into integer
    const movie = moviesList.find(movie => movie.id === id);
    if (!movie){
        res.status(404).send("Movie with given ID is not found."); //404 Not Found
        return;
    }
    //Delete
    let index = moviesList.indexOf(movie);
    moviesList.splice(index, 1);
    res.send(movie);
});

function validateMovie(movie) {
    //validation using Joi
    const validationSchema = {
        title: Joi.string().required(),
        year: Joi.allow(),
        genres: Joi.allow(),
        ratings: Joi.allow(),
        poster: Joi.allow(),
        contentRating: Joi.allow(),
        duration: Joi.allow(),
        releaseDate: Joi.allow(),
        averageRating: Joi.allow(),
        originalTitle: Joi.allow(),
        storyline: Joi.allow(),
        actors: Joi.allow(),
        imdbRating: Joi.allow(),
        posterurl: Joi.allow()
    };

    return Joi.validate(movie, validationSchema);
}

const port = process.env.PORT || 3000;
vidflixApi.listen(port, () => {
    console.log(`Listening app on ${port}.`);
});