import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import styles from './card-info.module.css'; 
import PokemonType from '../../interfaces';

interface CardInfoProps {
  pokemon: PokemonType | null;
}

function CardInfo({ pokemon }: CardInfoProps) {

  const renderStat = (label: string, value: number) => (
    <>
      <div className={styles.nameInfo}>
        <h4>{label}</h4>
        <h4>{value * 10} / 100</h4>
      </div>
      <Box sx={{ width: '100%' }}>
        <LinearProgress color='success' variant="determinate" value={value * 10} />
      </Box>
    </>
  );

  return (
    <Card className={styles.card} sx={{ maxWidth: 345}}>
      {pokemon === null ? (
        <CardActionArea className={styles.cardNull}>
          <h1>Select pokemons</h1>
        </CardActionArea>
      ):(
        <CardActionArea className={styles.cardInfo}>
            <CardMedia
              className={styles.img}
              component="img"
              image={pokemon.imageUrl}
              alt={pokemon.name}
            />
          <CardContent className={styles.info}>
            <Typography gutterBottom variant="h5" component="div">
              {pokemon.name}
            </Typography>
            <hr />
            {renderStat('HP', pokemon.hp)}
            {renderStat('Attack', pokemon.attack)}
            {renderStat('Defense', pokemon.defense)}
            {renderStat('Speed', pokemon.speed)}
          </CardContent>
        </CardActionArea>
      )}
    </Card>
  );
}

export default CardInfo;