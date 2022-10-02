const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {

  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});

router.get('/:id', (req, res) => {
  //gets movie details by ID. should return info from movies DB + all genres.
  const movieId = req.params.id;

  const query = `
    SELECT title, description, poster, JSON_AGG(g.name) genres
      FROM movies m
        JOIN movies_genres mg ON m.id = mg.movie_id
        JOIN genres g ON g.id = mg.genre_id
      WHERE m.id = ${movieId}
      GROUP BY m.id;
  `
  pool.query(query)
    .then( result => {
      res.send(result.rows[0]);
    })
    .catch(err => {
      console.log('ERROR: Get movies details', err);
      res.sendStatus(500);
    })
})

router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
    const createdMovieId = result.rows[0].id

    // Now handle the genre referencr
    for (let genre of req.body.genres) {
      const insertMovieGenreQuery = `
        INSERT INTO "movies_genres" ("movie_id", "genre_id")
        VALUES  ($1, $2);
        `
        // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
        pool.query(insertMovieGenreQuery, [createdMovieId, genre])
          
    }
      res.sendStatus(201);
    }).catch(err => {
      // catch for second query
      console.log('error in insert movie loop',err);
      res.sendStatus(500)
    })

 // Catch for first query
})

module.exports = router;