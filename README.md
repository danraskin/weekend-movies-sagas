# Project Name

[Project Instructions](./INSTRUCTIONS.md), this line may be removed once you have updated the README.md

## Description

Your project description goes here. What problem did you solve? How did you solve it?

Additional README details can be found [here](https://github.com/PrimeAcademy/readme-template/blob/master/README.md).

Main features of interest:

## Multiple genre requests (PUT+POST)

CODE IN: movie.router.js

genres are an array in req.body.

New movie (router.POST /movie/id) sends two pool queries: first adds to 'movies' table based on movieID. second query loops through genres array and adds movie_id and genre_id to 'movies_genres' table.

Edit movie (router.PUT /movie/id) sends THREE pool queries: first adds to 'movies' table based on movieID. second DELETES all data with movieId in 'movies_genres'. third loops through genres and adds to 'movies_genres'.

## Edit movie/Genre List Button

CODE IN: EditMovie/SelectGenre Button

This section was HARDD because i wanted to seed current movie details to the input form. this was challenging due to lag time between SAGAs//reducers and DOM load.

select genre button takes all kinds of props in order to show selected genres.



