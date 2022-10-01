import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'

import './MovieList.css'

function MovieList() {
    const history = useHistory();
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);


    const handleDetailsClick = (event) => {
        const movieId = event.target.id;
        history.push(`/details/${movieId}`)
    }

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>
                                <img src={movie.poster}  alt={movie.title} id={movie.id} onClick={handleDetailsClick} />
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;