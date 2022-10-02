import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'

function MovieDetails() {
    const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();
    const movieId = params.id;

    useEffect(() => {
        
        //retrieves movie details by ID once page loads
        dispatch({
            type: 'FETCH_MOVIE_DETAILS',
            payload: movieId
        });
        
        //clears database details on page close
        return () => {
            dispatch({
                type: 'CLEAR_MOVIE_DETAILS' // sends to movieDetails reducer
            })
        };
        //calls useEffect *if* params.id changes
    },[movieId]);

    const movieDetails = useSelector(store => store.movieDetails); //movieDetails set to store on DOM load


    const handleClick = () => {
        console.log(movieDetails.genres);
    }
    const handleNavClick = () => {
        history.push(`/edit/${movieId}`);
    }


//movie details displays using conditional rendering. kind of ugly.
  return (
    <>
      <h2>Movie Details</h2>
      <button onClick={handleNavClick}>EDIT</button>
      <ul>
        <li>{movieDetails.title}</li>
            { movieDetails.genres ?

                movieDetails.genres.map((genre, i) => (
                    <span key={i}>/ {genre} /</span>
                ))

               : null
            }
        <li>{movieDetails.description}</li>
        <img src={movieDetails.poster} onClick={handleClick}></img>

      </ul>
    </>
  )
}

export default MovieDetails