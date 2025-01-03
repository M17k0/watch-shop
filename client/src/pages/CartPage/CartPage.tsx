import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { useCart } from '@/contexts/CartContext';
import { MdRemoveCircle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChangeQuantity = (id: number, quantity: number) => {
    if (quantity < 1 || quantity > 9) {
      return;
    }
    setLoading(true);
    updateQuantity(id, quantity);
    setLoading(false);
  };

  const handleRemove = (id: number) => {
    setLoading(true);
    removeFromCart(id);
    setLoading(false);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          Your cart is empty.
        </Typography>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          {cart.map(item => (
            <Box
              key={item.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 2,
                border: '1px solid #ddd',
                borderRadius: '8px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginRight: '16px',
                  }}
                />
                <Box>
                  <Typography variant="body1" gutterBottom>
                    {item.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    ${item.price.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  value={item.quantity}
                  type="number"
                  onChange={e =>
                    handleChangeQuantity(item.id, Number(e.target.value))
                  }
                  size="small"
                  sx={{ width: 60, marginRight: 2 }}
                  disabled={loading}
                />
                <IconButton
                  color="error"
                  onClick={() => handleRemove(item.id)}
                  disabled={loading}
                >
                  <MdRemoveCircle />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {cart.length > 0 && (
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6">Total:</Typography>
          <Typography variant="h6" color="primary">
            $
            {cart
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toFixed(2)}
          </Typography>
        </Box>
      )}

      <Box sx={{ marginTop: 4 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={cart.length === 0 || loading}
          onClick={() => navigate('/checkout')}
        >
          {loading ? (
            <CircularProgress size={24} color="secondary" />
          ) : (
            'Proceed to Checkout'
          )}
        </Button>
      </Box>
    </Box>
  );
}
