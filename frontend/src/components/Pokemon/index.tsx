import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import styles from './pokemon.module.css';

interface Props {
  name: string;
  imageUrl: string;
}

export default function Pokemon(props: Props) {
  const {name, imageUrl} = props;
  return (
    <Card className={styles.card} sx={{ maxWidth: 345, borderRadius: 2, minWidth: "100wh" }}>
      <CardActionArea>
        <CardMedia
        sx={{ height: 139, paddingTop: 1 }}
        image={imageUrl}
        title="pokemon"
      />
        <CardContent >
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
