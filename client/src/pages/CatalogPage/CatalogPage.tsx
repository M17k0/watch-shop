import { WatchGrid } from '@/components/WatchGrid/WatchGrid';
import { Pagination } from '@/components/Pagination/Pagination';
import { watchService } from '@/services/watchService';
import { useAsync } from '@/hooks/useAsync';
import { useSearchParams } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import { useThrottled } from '@/hooks/useThrottled';
import {
  TextField,
  Box,
  Typography,
  Container,
  CircularProgress,
} from '@mui/material';
import { TagFilter } from '@/components/TagFilter/TagFilter';

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const pageFromParams = parseInt(searchParams.get('page') ?? '1', 10);
    if (pageFromParams !== currentPage) {
      setCurrentPage(pageFromParams);
    }
  }, [searchParams]);

  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const handleFilterApply = (tags: number[]) => {
    setSelectedTags(tags);
  };

  const { data, loading, error } = useAsync(
    () =>
      watchService.loadWatches(
        searchQuery,
        currentPage,
        pageSize,
        selectedTags,
      ),
    [searchParams, currentPage, selectedTags],
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Watches
        </Typography>
      </Box>
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          type="search"
          variant="outlined"
          placeholder="Search by name of watch..."
          value={searchTerm}
          onChange={onSearchChange}
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />
      </Box>

      {loading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 5,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {error != undefined && (
        <Typography color="error" textAlign="center" sx={{ mt: 3 }}>
          'Oops, something went wrong.'
        </Typography>
      )}

      <TagFilter onFilterApply={handleFilterApply} />

      {data && (
        <>
          <WatchGrid watches={data.watches ?? []} />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(data.total / pageSize)}
              onPageChange={handlePageChange}
            />
          </Box>
        </>
      )}
    </Container>
  );
}
