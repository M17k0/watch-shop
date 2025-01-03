import { useNavigate } from 'react-router-dom';
import classes from './WatchCard.module.css';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Watch } from '@/models/watchCard';

interface WatchCardProps {
  watch: Watch;
}

export function WatchCard({ watch }: WatchCardProps) {
  const navigate = useNavigate();

  return (
    <>
      <Card
        className={classes.watchCard}
        onClick={() => navigate(`/watches/${watch.id}`)}
      >
        <CardMedia
          className={classes.watchImage}
          component="img"
          height="250"
          width="100%"
          image={watch.imageUrl}
          alt={watch.name}
        />
        <CardContent>
          <Typography variant="subtitle1" component="div">
            {watch.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${watch.price}
          </Typography>
          {/* <Button size="small" onClick={(e) => { e.stopPropagation() }}>Add to Cart</Button> */}
        </CardContent>
      </Card>
      {/* <AddTagsToProduct productId={watch.id} onTagsAdded={() => {}} productTags={new Set(watch.productTags.map((tag) => tag.id))} /> */}
    </>
  );
}
