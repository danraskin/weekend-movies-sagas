

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';


function MovieCard({movie, handleDetailsClick}) {

    return(
        <Card>
            <Stack spacing={2} direction="column">
                <h3>{movie.title}</h3>
                <CardContent>
                    <img src={movie.poster}  alt={movie.title} id={movie.id} onClick={handleDetailsClick} />
                </CardContent>
            </Stack>
        </Card>
    );
}
export default MovieCard;