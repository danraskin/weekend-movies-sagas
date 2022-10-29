## Full-Stack Movie Pages App

This app demonstrates principles of CRUD using React-Redux-Saga. Users can add movies to list, view and edit movie details, and delete movies from list. Movies can be tagged with multiple genres, which is made possible through SQL JOIN queries in node.js server. Developed in a two-day weekend sprint. 

![Details View](https://user-images.githubusercontent.com/104224468/198847820-b2393e46-94af-4be0-b13a-5c1970451ab9.png)
![Main Page](https://user-images.githubusercontent.com/104224468/198847810-d375c966-9639-4010-87dd-ebe74c9bb680.png)
![Edit View](https://user-images.githubusercontent.com/104224468/198847827-c6831afa-de11-4b7d-89aa-50870e9a526c.png)


## Features of interest:

### Multiple genre requests (PUT+POST)

(see: movie.router.js)

genre stored as an array in req.body.

New movie (router.POST /movie/id) sends two pool queries: first adds to 'movies' table based on movieID. second query loops through genres array and adds movie_id and genre_id to 'movies_genres' table.

Edit movie (router.PUT /movie/id) sends THREE pool queries: first adds to 'movies' table based on movieID. second DELETES all data with movieId in 'movies_genres'. third loops through genres and adds to 'movies_genres'.

### Edit movie/Genre List Button

(see: EditMovie/SelectGenre Button)

This section was HARD because i wanted to seed current movie details to the input form. this was challenging due to lag time between SAGAs//reducers and DOM load.

select genre button takes all kinds of props in order to show selected genres.

### Technologies

- JS/HTML/CSS
- React/Redux/Saga
- axios
- node.js/express
- postgreSQL
- MaterialUI
