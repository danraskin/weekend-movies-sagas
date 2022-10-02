import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import SelectGenreButton from '../Form/SelectGenreButton';

//@mui imports
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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


    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES' }); //in case user navigates directly to page.
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


    // UNABLE TO SEED NEWGENRES WITH OLD GENRES ON DOM LOAD. 

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

    
    //triggerOldGenres is called onMouseEnter in SelecdtGenreButton. boolean state (seedGenreSelection) and conditional switch ensures seedGen is triggered only once.
    //triggerOldGenres is housed outside selectGenreButton so that button can be used in NewMovie component.

    const [seedGenreSelection, setSeed] = useState(true);
    const triggerOldGenres = () => {
        if (seedGenreSelection) {
            setNewGenres(oldGenres);
            setSeed(false);
        }
    }

    const handleClick = (e) => {
        switch (e.target.value) {
            case 'Save':
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

    //need new logic for all input fields.

    // THIS was an old setter for a different dropdown menu. keeping for reference.

    // const handleSelectGenre = (genreId) => {
    //     setNewGenres( arr => [...arr, genreId]);
    // }


    return (
        <div>
            <input type="text" placeholder={movieDetails.title} value={title} onChange={e=>setTitle(e.target.value)}></input>
            <textarea type="text" placeholder={movieDetails.description} value={description} onChange={e=>setDescription(e.target.value)}></textarea>            
            <SelectGenreButton 
                genres={genres}
                newGenres={newGenres}
                setNewGenres={setNewGenres}
                triggerOldGenres={triggerOldGenres}
            />
            <button value="Save" onClick={handleClick}>Save</button>
            <button value="Cancel" onClick={handleClick}>Cancel</button>
            <button value="Delete" onClick={handleClick}>Delete</button>
        </div>
    );
}

export default EditMovie