const filmModel = require('./film.model')
let store = []

getAllFilms = async (req, res) => {
  let variable = await filmModel.getPageOfFilmsAndNumberNext(req.query.page)
  res.json(variable)
}

addFilm = async (req, res) => {
  await filmModel.addFilm(req.body)
  res.status(200).json(req.body)
}

postFromJSON = async (req, res) => {
  store = [...req.body]
  await filmModel.ListToDB(store)
  res.json()
}

getFilmsByTitle = async (req, res) => {
  let result = await filmModel.getAllFilmsByTitle(req.query.title)
  res.json(result)
}

deleteFilm = async (req, res) => {
  await filmModel.deleteFilm(req.query.id)
  res.status(200).json()
}

getAllFilmsByActorName = async (req, res) => {
  let result = await filmModel.getAllFilmsByActorName(req.query.name)
  res.json(result)
}

module.exports = {getAllFilms, addFilm, postFromJSON, getFilmsByTitle, deleteFilm, getAllFilmsByActorName }
