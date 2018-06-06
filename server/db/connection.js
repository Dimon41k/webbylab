const Sequelize = require('sequelize')
const cfg = require('../config/cfg')
const Op = Sequelize.Op
var sequelize = new Sequelize(cfg.db_name, null, null, {
  dialect: 'sqlite',
  storage: cfg.path_to_db,
  operatorsAliases: false

})
sequelize
  .authenticate()
  .then(function () {
    console.log('Connection has been established successfully.')
  }, function (err) {
    console.log('Unable to connect to the database:', err)
  })

//  MODELS
const Film = sequelize.define('films', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  title: { type: Sequelize.STRING, unique: true },
  year: Sequelize.STRING,
  format: Sequelize.ENUM('DVD', 'VHS', 'Blu-Ray')
})

const Actor = sequelize.define('actors', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  first_name: Sequelize.STRING,
  second_name: Sequelize.STRING
},
{
  indexes: [
    {
      unique: true,
      fields: ['first_name', 'second_name']
    }
  ]
}
)

const FilmActor = sequelize.define('films_actors', {})

Actor.belongsToMany(Film, { through: FilmActor })
Film.belongsToMany(Actor, { through: FilmActor })

//  SYNC SCHEMA
sequelize
  .sync({ force: false })
  .then(function (err) {
    console.log('It worked!')
  }, function (err) {
    console.log('An error occurred while creating the table:', err)
  })

module.exports = { Film, Actor, FilmActor, sequelize, Op}
