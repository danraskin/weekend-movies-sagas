import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

function MovieDetails() {

    const params = useParams();
    const dispatch = useDispatch();
    //const movieDetails = useSelector(store => store.movieDetails); // right now, movieDetails is not in store

    useEffect(() => {
        const movieId = params.id;
        console.log(movieId);
        
        //retrieves movie details by ID once page loads
        // dispatch({
        //     type: 'SAGA.SOMETHINGINHERE', //not written
        //     payload: movieId
        // });

        // //clears database details on page close
        // return () => {
        //     dispatch({
        //         type: 'SAGA.CLEAR_MOVIE_DETAILS' // not written
        //     })
        // };
        //calls useEffect *if* params.id changes
    },[params.id]);


//   const bikeDetails = useSelector(store => store.bikeDetails)

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