const express = require('express')
const router = express.Router()
const FilmController = require('./film.controller')

router
  .get('/', FilmController.getAllFilms)
  .delete('/', FilmController.deleteFilm)
  .post('/', FilmController.addFilm)
  .get('/film_name', FilmController.getFilmsByTitle)
  .get('/actor_name', FilmController.getAllFilmsByActorName)
  .post('/from_json', FilmController.postFromJSON)

module.exports = router
