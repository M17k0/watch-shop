import { Pagination as MuiPagination, PaginationItem } from '@mui/material';
import { Link } from 'react-router-dom';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <MuiPagination
      count={totalPages}
      page={currentPage}
      onChange={(_, page) => onPageChange(page)}
      color="primary"
      renderItem={item => (
        <PaginationItem
          {...item}
          component={Link}
          to={`?page=${item.page}`}
          onClick={e => {
            e.preventDefault();
            onPageChange(item.page ?? 1);
          }}
        />
      )}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 3,
      }}
    />
  );
}
