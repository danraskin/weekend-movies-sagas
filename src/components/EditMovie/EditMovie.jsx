import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import SelectGenreButton from '../Form/SelectGenreButton';

//@mui imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function EditMovie() {
    const history = useHistory();
    const dispatch = useDispatch();
    const params = useParams();

    const movieId = params.id;

    // REDUX state
    const genres = useSelector(store => store.genres);
    const movieDetails = useSelector(store => store.movieDetails); //movieDetails set to store on DOM load

    // local state for inputs
    const [title, setTitle] = useState ('');
    const [description, setDescription] = useState ('');
    const [newGenres, setNewGenres] = useState([]); //Ideally, initial state would be useState(oldGenres). unfortunately there are lag issues.
    const [seedGenreSelection, setSeed] = useState(true); // this is used to seed genre menu with values from movieDetails.

    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES' }); //in case user navigates directly to page.
        //retrieves movie details by ID once page loads
        dispatch({
            type: 'FETCH_MOVIE_DETAILS',
            payload: movieId
        });

        setTitle(movieDetails.title); //this sets state for EDIT_MOVIE dispatch in case user does not make any edits to form.
        setDescription(movieDetails.description); //without this, parameters are only set on form 'onChange'.
        setSeed(true); //this reloads genre menu in case user navigates directly to edit/id from another edit/#. otherwise, movieDetails is updated, but newGenres is not re-seeded with movieDescription array.

        //clears database details on page close
        return () => {
            dispatch({
                type: 'CLEAR_MOVIE_DETAILS' // sends to movieDetails reducer
            })
        };
        //calls useEffect *if* params.id changes
    },[movieId]);


    // UNABLE TO SEED NEWGENRES WITH OLD GENRES ON DOM LOAD. oldGenres returns and array of genre IDs. needs to loop through movideDetails.genres AND full genre list b/c movieDetails.genres is array of strings with no ids. 

    const oldGenres = () => {
        const oldGenreList = [];
        for ( let oldGenre of movieDetails.genres) {
            for ( let genre of genres) {
                if ( oldGenre === genre.name ) {
                    oldGenreList.push(genre.id);
                }
            }
        }
        return oldGenreList;
    }

    
    //triggerOldGenres is called onMouseEnter in SelecetGenreButton. boolean state (seedGenreSelection) and conditional switch ensures seedGen is triggered only once.
    //triggerOldGenres is housed outside selectGenreButton so that button can be used in NewMovie component.

    const triggerOldGenres = () => {
        if (seedGenreSelection) {
            setNewGenres(oldGenres);
            setSeed(false);
        }
    }

        // const logValues = ()=> {
        // testing code for future.
        //     console.log(title);
        //     console.log(description);
        //     console.log(description);
        //     console.log(newGenres);
        // }
    const handleClick = (e) => {
        switch (e.target.value) {
            case 'Save':
            // return logValues(); //this is testing code. retaining for future.
                dispatch({
                    type: 'EDIT_MOVIE',
                    payload: {
                        title: title,
                        description: description,
                        genres: newGenres,
                        movieId: movieId
                    }    
               });
               return history.push('/');
            case 'Cancel':
                return history.push('/');
            case 'Delete':
                dispatch({type: 'DELETE_MOVIE', payload: movieId});
                return history.push('/');
            default:
               return history.push('/');
        }
    }


    // THIS was an old setter for a different dropdown menu. keeping for reference.

    // const handleSelectGenre = (genreId) => {
    //     setNewGenres( arr => [...arr, genreId]);
    // }

    return (
        <Card
            className="movieForm"
            component="form"
            sx={{
                height: 500,
                width: 300,
            }}
        >
            <Stack spacing={1} direction="column" alignItems="center">
                <Typography>Edit Movie</Typography>
                <TextField
                    required
                    sx={{width: "75%"}}
                    id="outlined-required"
                    defaultValue={movieDetails.title}
                    label="title"
                    onChange={e=>setTitle(e.target.value)}
                    variant="filled"
                />
                <TextField
                    required
                    sx={{width: "75%"}}
                    id="outlined-required"
                    defaultValue={movieDetails.description}
                    label="description"
                    onChange={e=>setDescription(e.target.value)}
                    multiline
                    rows={6}
                    variant="filled"
                />
                <SelectGenreButton 
                    genres={genres}
                    newGenres={newGenres}
                    setNewGenres={setNewGenres}
                    triggerOldGenres={triggerOldGenres}
                />
                <Stack direction="row">
                    <Button value="Save" onClick={handleClick}>Save</Button>
                    <Button value="Cancel" onClick={handleClick}>Cancel</Button>
                    <Button value="Delete" onClick={handleClick}>Delete</Button>
                </Stack>
            </Stack>
        </Card>






    );
}

export default EditMovie