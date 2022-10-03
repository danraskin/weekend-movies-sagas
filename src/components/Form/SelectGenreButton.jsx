
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

function SelectGenreButton({ setNewGenres, newGenres, genres, triggerOldGenres }) {
  
    const theme = useTheme();
    const handleFormChange = (e) => {
        setNewGenres(e.target.value);
    }

    return (
        <div onMouseEnter={triggerOldGenres}>
        <FormControl sx={{ m: 1, width: 230}}>
            <InputLabel id="demo-multiple-name-label" >Genres</InputLabel>
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
                        >
                            {genre.name}
                        </MenuItem>
                    ))}        
            </Select>
        </FormControl>
        </div>
    );
}

export default SelectGenreButton;