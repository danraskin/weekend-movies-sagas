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
    const genres = useSelector(store => store.genres);
    const movieId = params.id;

   // local state for inputs
   const movieDetails = useSelector(store => store.movieDetails); //movieDetails set to store on DOM load
   const [title, setTitle] = useState ('');
   const [description, setDescription] = useState ('');
   const [newGenres, setNewGenres] = useState([]); //local state for genres?


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


    const handleClick = (e) => {
        switch (e.target.value) {
            case 'Save':
            //     dispatch({
            //         type: 'CREATE_MOVIE',
            //         payload: {
            //             title: title,
            //             description: description,
            //             poster: posterUrl,
            //             genres: newGenres
            //         }    
            //     })
            //     history.push('/movies');
                
            // case 'Cancel':
            //     history.push('/movies')
            default:
                return null;
        }
    }

    const handleSelectGenre = (genreId) => {
        setNewGenres( arr => [...arr, genreId]);
    }


    return (
        <div>
            <input type="text" placeholder={movieDetails.title} value={title} onChange={e=>setTitle(e.target.value)}></input>
            <textarea type="text" placeholder={movieDetails.description} value={description} onChange={e=>setDescription(e.target.value)}></textarea>            
            <SelectGenreButton 
                genres={genres}
                newGenres={newGenres}
                handleSelectedGenre={handleSelectGenre}
            />
            <button value="Save" onClick={handleClick}>Save</button>
            <button value="Cancel" onClick={handleClick}>Cancel</button>
        </div>
    );
}

export default EditMovie