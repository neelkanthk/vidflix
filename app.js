const express = require('express');
const vidflixDb = require('./vidflixDb');
const vidflixApi = express();
const moviesList = vidflixDb.movies;
var i = 1;
for (var i in moviesList) {
    moviesList[i].id = parseInt(i)+1;
}

//Get all movies
vidflixApi.get('/api/v1/movies', (req, res) => {
    let data = {
        "total": moviesList.length,
        "data": moviesList.slice(0,9)
    };
    res.status(200).contentType('application/json').send(data);
});
//Get movie by Id
vidflixApi.get('/api/v1/movies/:id', (req, res) => {
    var id = parseInt(req.params.id); //Type casting 'id' into integer
    let queryParams = req.query;
    //res.send(queryParams);
    let data = moviesList.find(movie => movie.id === id);

    if(!data)
        res.status(404);

    res.send(data);
});

const port = process.env.PORT || 3000;
vidflixApi.listen(port, () => {
    console.log(`Listening app on ${port}.`);
});