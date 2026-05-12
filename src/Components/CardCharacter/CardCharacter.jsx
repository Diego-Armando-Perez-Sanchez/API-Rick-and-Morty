import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardActionArea from '@mui/material/CardActionArea'
import './CardCharacter.css'

/**
 * Tarjeta individual del personaje
 */
const CardCharacter = ({ name, image, species, status, gender }) => {
    return (
        <Card className="Card">
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="240"
                    image={image}
                    alt={name}
                />
                <CardContent className="CardContent">
                    <Typography className="CardTitle" gutterBottom variant="h5">
                        {name}
                    </Typography>
                    <Typography className="CardText">
                        Especie: {species}
                    </Typography>
                    <Typography className="CardText">
                        Estado: {status}
                    </Typography>
                    <Typography className="CardText">
                        Género: {gender}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default CardCharacter
