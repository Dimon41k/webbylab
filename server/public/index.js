fs = require('fs')
fs.readFile('./sample_movies.txt', 'utf8', function (er, data) {
  function parseLineKey (line) {
    const key = line.split(':')[0]

    return key.trim().toLowerCase()
  }

  function parseLineValue (line) {
    const value = line.split(':')[1]

    return value.trim()
  }

  function parseMovie (text) {
    const rawMovieLines = text.split(/\n/)
    const movie = {}

    rawMovieLines.forEach(line => {
      if (parseLineKey(line) === 'release year') {
        movie.year = +parseLineValue(line)
        return
      }

      if (parseLineKey(line) === 'stars') {
        const stars = parseLineValue(line).split(',').map(star => star.trim())
        movie.stars = stars
        return
      }

      movie[parseLineKey(line)] = parseLineValue(line)
    })

    return movie
  }

  function parseText (text) {
    const rawMovies = text.split(/\n\s*\n/)

    return rawMovies
      .filter(rawMovie => rawMovie.trim().length)
      .map(rawMovie => parseMovie(rawMovie))
  }

  data = parseText(data)
  console.log(data)

  // data = data.trim().split('\n\n').map(x=>x.split('\n').map(x=>split()))

  console.log(data)
})
