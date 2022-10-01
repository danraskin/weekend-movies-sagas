import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

function MovieDetails() {

    const params = useParams();
    const dispatch = useDispatch();
    const genres = useSelector(store => store.genres); //retrieves genres from store. genres will be set bye useEffect in HOME (MovieList)
    //const movieDetails = useSelector(store => store.movieDetails); // right now, movieDetails is not in store

//need to figure out what DATA STRUCTURE i want my 'moviesDetails' to be in.


    useEffect(() => {
        const movieId = params.id;
        console.log(movieId);
        
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
    },[params.id]);


//   const bikeDetails = useSelector(store => store.bikeDetails)


//must be a NAVBAR/route button.
  return (
    <>
      <h2>Movie Details</h2>
      <ul>
        {/* <li>{movieDetails.title}</li>
        <li>{movieDetails.description}</li> */}
      </ul>
    </>
  )
}

export default MovieDetails