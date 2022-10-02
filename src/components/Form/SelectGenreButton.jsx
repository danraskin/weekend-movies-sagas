import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(genreId, newGenres, theme) {
    return {
      fontWeight:
        newGenres.indexOf(genreId) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

function SelectGenreButton({ handleSelectedGenre, newGenres, genres }) {
    const theme = useTheme();

      const handleFormChange = (e) => {
        return null;
        // const {
        //     target: { value },
        //   } = e;
        //   setNewGenres(
        //     // On autofill we get a stringified value.
        //     typeof value === 'string' ? value.split(',') : value,
        //   );
    }

    return (
        <>
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">Genres</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="SelectGenres"
                    multiple
                    value={newGenres}
                    onChange={handleFormChange}
                    input={<OutlinedInput label="Genre" />}
                    MenuProps={MenuProps}
                >
                    {genres.map(genre => (
                        <MenuItem
                            key={genre.id}
                            value={genre.id}
                            style={getStyles(genre.id, newGenres, theme)}
                            onClick={e => handleSelectedGenre(genre.id)}
                        >
                            {genre.name}
                        </MenuItem>
                    ))}        
            </Select>
        </FormControl>
{/*             
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
                </Menu> */}
        </>
    )
}

export default SelectGenreButton;