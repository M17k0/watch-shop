import { WatchGrid } from '@/components/WatchGrid/WatchGrid';
import classes from './CatalogPage.module.css';
import { watchService } from '@/services/watchService';
import { useAsync } from '@/hooks/useAsync';
import { useSearchParams } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import { useThrottled } from '@/hooks/useThrottled';

export function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const pageSize = 10;
  
  const searchQuery = searchParams.get('query') ?? '';
  const pageParam = parseInt(searchParams.get('page') ?? '1', 10);

  const [currentPage, setCurrentPage] = useState(pageParam);

  const setSearchQuery = useThrottled((value: string) => {
    if (value.length === 0) {
      searchParams.delete('query');
    } else {
      searchParams.set('query', value);
    }
    searchParams.set('page', '1');
    setSearchParams(searchParams);
    setCurrentPage(1);
  }, 500);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (direction: 'next' | 'previous') => {
    const nextPage = direction === 'next' ? currentPage + 1 : Math.max(currentPage - 1, 1);
    setCurrentPage(nextPage);
    searchParams.set('page', nextPage.toString());
    setSearchParams(searchParams);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const pageFromParams = parseInt(searchParams.get('page') ?? '1', 10);
    if (pageFromParams !== currentPage) {
      setCurrentPage(pageFromParams);
    }
  }, [searchParams]);

  const { data, loading, error } = useAsync(() => watchService.loadWatches(searchQuery, currentPage, pageSize), [searchParams, currentPage]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <h1>Watches</h1>
        <input
      type='search'
      placeholder='Search by name of watch...'
      value={searchTerm}
      onChange={onSearchChange} />
        {loading && <h3>Loading...</h3>}
        {error ? <>Oops something went wrong</> : null}
        <WatchGrid watches={data?.watches ?? []} />
        <div className={classes.pagination}>
        {currentPage > 1 && (
          <button onClick={() => handlePageChange('previous')} disabled={currentPage === 1}>
            <>nazad</>
          </button>
        )}
        <span>Page {currentPage}</span>
        {currentPage < (data ? Math.ceil(data.total / pageSize) : 0) && (
          <button onClick={() => handlePageChange('next')}>
            <>napred</>
          </button>
        )}
      </div>
      </div>
    </div>
  );
}
