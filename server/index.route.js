const express = require('express');
const filmRoutes = require('./server/film');

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files


// mount user routes at /film
router.use('/film', filmRoutes);



module.exports = router;