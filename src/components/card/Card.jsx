import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: "100%",
  },
  media: {
    height: 250,
  },
});

const images = [
  "https://images-na.ssl-images-amazon.com/images/I/81Z1G-IvWsL._SL1500_.jpg",
  "https://5.imimg.com/data5/ER/BL/MY-1665840/ez9-500x500.jpg",
  "https://www.sefiles.net/images/library/large/tribe-bicycle-co.-urban-cross-203517-1-18-6.jpg",
  "https://robishop.com.bd/pub/media/catalog/product/cache/image/600x600/e9c3970ab036de70892d86c6d221abfe/d/u/duranta_cb_allan_hunter_26_inch_gents_flat_bike.jpg"
]

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={images[Math.floor(Math.random()*images.length)]}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
