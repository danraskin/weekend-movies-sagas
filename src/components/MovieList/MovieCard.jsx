

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';


function MovieCard({movie, handleDetailsClick}) {

    return(
        <Card
            raised
            sx={{
                maxWidth: 200,
                margin: "0 auto",
                padding: "0.1em"
            }}>
            <Stack direction="column">
                <h3>{movie.title}</h3>
                <CardMedia 
                    component="img"
                    src={movie.poster}
                    alt={movie.title}
                    id={movie.id}
                    onClick={handleDetailsClick}
                    sx={{
                        width: '100%',
                        objectFit: "contain"
                    }}
                />
            </Stack>
        </Card>
    );
}
export default MovieCard;