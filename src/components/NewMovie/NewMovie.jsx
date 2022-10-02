import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import SelectGenreButton from '../Form/SelectGenreButton';

//@mui imports
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function NewMovie() {
    const history = useHistory();
    const dispatch = useDispatch();

    const genres = useSelector(store => store.genres);

    // local state for inputs
    const [title, setTitle] = useState ('');
    const [description, setDescription] = useState ('');
    const [posterUrl, setPosterUrl] = useState ('');
    const [newGenres, setNewGenres] = useState([]);

    const triggerOldGenres = () => {
        return null;
    }

    useEffect(() => {
        //retrieves genres. ONLY NECESSARY if user direct-routes to this url.
        dispatch({ type: 'FETCH_GENRES'});
    },[]);


    const handleClick = (e) => {
        switch (e.target.value) {
            case 'Save':
                dispatch({
                    type: 'CREATE_MOVIE',
                    payload: {
                        title: title,
                        description: description,
                        poster: posterUrl,
                        genres: newGenres
                    }    
                })
                history.push('/movies');
                
            case 'Cancel':
                history.push('/movies')
            default:
                return null;
        }
    }

    return (
        <div>
            <input type="text" placeholder="title" value={title} onChange={e=>setTitle(e.target.value)}></input>
            <textarea type="text" placeholder="description" value={description} onChange={e=>setDescription(e.target.value)}></textarea>
            <input type="textbox" placeholder="url" value={posterUrl} onChange={e=>setPosterUrl(e.target.value)}></input>
            <SelectGenreButton 
                genres={genres}
                newGenres={newGenres}
                setNewGenres={setNewGenres}
                triggerOldGenres={triggerOldGenres}
            />
            <button value="Save" onClick={handleClick}>Save</button>
            <button value="Cancel" onClick={handleClick}>Cancel</button>
        </div>
    );
}

export default NewMovie