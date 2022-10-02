import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'

import './MovieList.css'
import MovieCard from '../MovieList/MovieCard';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

function MovieList() {
    const history = useHistory();
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    //const genres = useSelector(store => store.genres); //use this if i am to arrange movies based on genre. will need a separate route to access movies_genres table.

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
        dispatch({ type: 'FETCH_GENRES' });
    }, []);


    const handleDetailsClick = (event) => {
        const movieId = event.target.id;
        history.push(`/details/${movieId}`)
    }
    const handleNavClick = () => {
        history.push('/newmovie')
    }
    return (
        <main>
            <button onClick={handleNavClick}>Add Movie</button>
            <Grid container spacing={2} className="movies">
                {movies.map(movie => (
                        <Grid key={movie.id}>
                            <Card sx={{ Width: 100, Hieght: 100}}>
                                <MovieCard key={movie.id} movie={movie} handleDetailsClick={handleDetailsClick}/>
                            </Card>
                        </Grid>
                    )
                )}
            </Grid>
        </main>





    );
}

export default MovieList;