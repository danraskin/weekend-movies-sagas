import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

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
    const [newGenres, setNewGenres] = useState([]); //local state for genres?

    const handleClick = (e) => {
        switch (e.target.value) {
            case 'Save':
                dispatch({
                    type: 'CREATE_MOVIE',
                    payload: {
                        title: title,
                        description: description,
                        poster: posterUrl,
                        genre_id: newGenres
                    }    
                })
                history.push('/movies');
                
            case 'Cancel':
                history.push('/movies')
            default:
                return null;
        }
    }
    

    // genre dropdown menu

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const open = Boolean(anchorEl);
    const handleMenuClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSelectGenre = (e,index) => {
        setNewGenres( arr => [...arr, e.target.value]);
        setSelectedIndex(index);
        setAnchorEl(null);
    }

    return (
        <div>
            <input type="text" placeholder="title" value={title} onChange={e=>setTitle(e.target.value)}></input>
            <textarea type="text" placeholder="description" value={description} onChange={e=>setDescription(e.target.value)}></textarea>
            <input type="textbox" placeholder="url" value={posterUrl} onChange={e=>setPosterUrl(e.target.value)}></input>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleMenuClick}
            >
                Genres
            </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                {genres.map((genre, index) => (
                    <MenuItem
                        key={genre.id}
                        value={genre.id}
                        // disabled={index === 0}
                        selected={index === selectedIndex}
                        onClick={event=>handleSelectGenre(event, index)}
                    >
                        {genre.name}
                    </MenuItem>
                    ))}
                </Menu>




            <button value="Save" onClick={handleClick}>Save</button>
            <button value="Cancel" onClick={handleClick}>Cancel</button>
        </div>
    );
}

export default NewMovie