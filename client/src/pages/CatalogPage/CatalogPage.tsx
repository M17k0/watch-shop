import { WatchGrid } from '@/components/WatchGrid/WatchGrid';
import classes from './CatalogPage.module.css';
import { watchService } from '@/services/watchService';
import { useAsync } from '@/hooks/useAsync';

export function CatalogPage() {
  const { data, loading, error } = useAsync(() => watchService.loadWatches('', 1, 10), []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <h1>Watches</h1>
        {loading && <h3>Loading...</h3>}
        {error ? <>Oops something went wrong</> : null}
        <WatchGrid watches={data?.watches ?? []} />
      </div>
    </div>
  );
}
