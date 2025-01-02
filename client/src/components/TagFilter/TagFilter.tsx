import { useState, useEffect } from 'react';
import {
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormControlLabel,
  Checkbox,
  Typography,
  CircularProgress,
} from '@mui/material';
import { categoryService } from '@/services/categoryService';
import { Tag } from '@/models/watchCard';
import { useAsync } from '@/hooks/useAsync';

interface TagFilterProps {
  onFilterApply: (selectedTags: number[]) => void;
}
export function TagFilter({ onFilterApply }: TagFilterProps) {
  const [open, setOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<Set<number>>(new Set());

  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useAsync(() => categoryService.getCategories(), []);

  const [tags, setTags] = useState<{ [categoryId: number]: Tag[] }>({});
  const [tagsLoading, setTagsLoading] = useState(false);
  const [tagsError, setTagsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllTags = async () => {
      if (!categories) return;

      setTagsLoading(true);
      setTagsError(null);

      try {
        const tagsByCategory: { [key: number]: Tag[] } = {};
        for (const category of categories) {
          const categoryTags = await categoryService.getTagsForCategory(
            category.id,
          );
          tagsByCategory[category.id] = categoryTags;
        }
        setTags(tagsByCategory);
      } catch (error) {
        setTagsError('Failed to load tags.');
      } finally {
        setTagsLoading(false);
      }
    };

    fetchAllTags();
  }, [categories]);

  const toggleTagSelection = (tagId: number) => {
    setSelectedTags(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tagId)) {
        newSet.delete(tagId);
      } else {
        newSet.add(tagId);
      }
      return newSet;
    });
  };

  const handleApply = () => {
    onFilterApply(Array.from(selectedTags));
    setOpen(false);
  };

  const loading = categoriesLoading || tagsLoading;

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Filter by Tags
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Filter by Categories and Tags</DialogTitle>
        <DialogContent dividers>
          {loading && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                py: 5,
              }}
            >
              <CircularProgress />
            </Box>
          )}

          {!loading && categoriesError != undefined && (
            <Typography color="error" textAlign="center">
              Failed to load categories.
            </Typography>
          )}
          {!loading && tagsError && (
            <Typography color="error" textAlign="center">
              {tagsError}
            </Typography>
          )}

          {!loading &&
            categories &&
            categories.map(category => (
              <Box key={category.id} sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  {category.name[0].toUpperCase() + category.name.slice(1)}
                </Typography>
                <FormControl component="fieldset">
                  {tags[category.id]?.map(tag => (
                    <FormControlLabel
                      key={tag.id}
                      control={
                        <Checkbox
                          checked={selectedTags.has(tag.id)}
                          onChange={() => toggleTagSelection(tag.id)}
                        />
                      }
                      label={tag.name[0].toUpperCase() + tag.name.slice(1)}
                    />
                  ))}
                </FormControl>
              </Box>
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleApply}>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
