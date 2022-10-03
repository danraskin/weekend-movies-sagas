import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

function MovieDetails() {
    const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();
    const movieId = params.id;

    const movieDetails = useSelector(store => store.movieDetails); //movieDetails set to store on DOM load


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

    const handleNavClick = () => {
        history.push(`/edit/${movieId}`);
    }


//movie details displays using conditional rendering. kind of ugly.
  return (
    <Card
        className="movieForm"
        component="form"
        sx={{
            // height: ,
            // width: 300,
        }}
    >
        <Stack spacing={1} direction="column" alignItems="center">
            <Typography>Movie Details</Typography>
            <Button onClick={handleNavClick}>Edit Movie</Button>
            <Typography>{movieDetails.title}</Typography>
            <Stack
                spacing={1}
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
            >
                { movieDetails.genres ?

                        movieDetails.genres.map((genre, i) => (
                            <span key={i}> {genre} </span>
                        ))

                    : null
                }
            </Stack>
            <Typography>{movieDetails.description}</Typography>
            <CardMedia 
                    component="img"
                    src={movieDetails.poster}
                    sx={{
                        width: '100%',
                        objectFit: "contain"
                    }}
                />
        </Stack>
    </Card>

  )
}

export default MovieDetails