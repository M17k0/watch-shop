import { useCart } from '@/contexts/CartContext';
import { useAsync } from '@/hooks/useAsync';
import { watchService } from '@/services/watchService';
import { Box, Button, Chip, CircularProgress, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export function WatchPage() {
  const params = useParams();
  const watchId = params.id;

  const {
    loading,
    data: watch,
    error,
  } = useAsync(
    async () => await watchService.loadWatch(Number(watchId)),
    [watchId],
  );

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (watch) {
      addToCart({
        id: watch.id,
        name: watch.name,
        price: watch.price,
        quantity: 1,
        imageUrl: watch.imageUrl,
      });
    }
    toast.success('Added to cart!');
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <Typography variant="h6" color="error">
          Failed to load watch details. Please try again later.
        </Typography>
      </Box>
    );
  }

  if (!watch) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <Typography variant="h6">Watch not found.</Typography>
      </Box>
    );
  }

  return (
    <>
    <Toaster />
    <Box
      sx={{
        padding: 4,
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: 4,
      }}
    >
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <img
          src={watch.imageUrl}
          alt={watch.name}
          style={{
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
        />
      </Box>

      <Box>
        <Typography variant="h4" gutterBottom>
          {watch.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {watch.description}
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          Price: ${watch.price.toFixed(2)}
        </Typography>
        <Typography
          variant="body2"
          color={watch.stock > 0 ? 'success.main' : 'error.main'}
          gutterBottom
        >
          {watch.stock > 0 ? `In Stock` : 'Out of Stock'}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Type: {watch.type}
        </Typography>

        {/* TODO: format with the different categories */}
        {watch.productTags?.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginTop: 2 }}>
            {watch.productTags.map(tag => (
              <Chip
                key={tag.id}
                label={tag.tagName[0].toUpperCase() + tag.tagName.slice(1)}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
        )}

        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 4 }}
          disabled={watch.stock <= 0}
          onClick={handleAddToCart}
        >
          {watch.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </Box>
    </Box>
        </>
  );
}
