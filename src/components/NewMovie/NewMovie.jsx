import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import SelectGenreButton from '../Form/SelectGenreButton';

//@mui imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

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
    //may not be necessary? exist here for SelectGenreButton component.
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
                return history.push('/');
            case 'Cancel':
                return history.push('/')
            default:
                return history.push('/');
        }
    }

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
                <Typography>New Movie</Typography>
                <TextField
                    sx={{width: "75%"}}
                    required
                    id="outlined-required"
                    label="Title"
                    value={title}
                    onChange={e=>setTitle(e.target.value)}
                    variant="filled"
                />
                <TextField
                    required
                    sx={{width: "75%"}}
                    id="outlined-required"
                    label="description"
                    value={description}
                    onChange={e=>setDescription(e.target.value)}
                    multiline
                    rows={6}
                    variant="filled"
                />
                <TextField
                    sx={{width: "75%"}}
                    required
                    id="outlined-required"
                    label="Poster image URL"
                    value={posterUrl}
                    onChange={e=>setPosterUrl(e.target.value)}
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
                </Stack>
            </Stack>
        </Card>
    );
}

export default NewMovie