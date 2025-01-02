import { Watch } from '@/models/watchCard';
import classes from './WatchGrid.module.css';
import { WatchCard } from '../WatchCard/WatchCard';

interface WatchGridProps {
  watches: Watch[];
}

export function WatchGrid({ watches }: WatchGridProps) {
  return (
    <div className={classes.grid}>
      {watches.map(watch => (
        <WatchCard key={watch.id} watch={watch} />
      ))}
    </div>
  );
}
