import { Box, Typography, Button, TextField } from '@mui/material';
import { useCart } from '@/contexts/CartContext';

export function CheckoutPage() {
  const { cart } = useCart();

  const handleSubmit = (e: React.FormEvent) => {
    // TODO: handle form submission
    e.preventDefault();
    alert('Order placed successfully!');
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      {/* Cart Summary */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>

        {cart.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            Your cart is empty.
          </Typography>
        ) : (
          <Box>
            {cart.map(item => (
              <Box
                key={item.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 2,
                  marginBottom: 2,
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
                      width: 80,
                      height: 80,
                      objectFit: 'cover',
                      borderRadius: '8px',
                      marginRight: '16px',
                    }}
                  />
                  <Box>
                    <Typography variant="body1" gutterBottom>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      ${item.price.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantity: {item.quantity}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total: ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {cart.length > 0 && (
          <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h6" color="primary">
              ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Checkout Form */}
      <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: 4 }}>
        <Typography variant="h6" gutterBottom>
          Shipping Details
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Full Name" variant="outlined" required fullWidth />
          <TextField label="Address" variant="outlined" required fullWidth />
          <TextField label="City" variant="outlined" required fullWidth />
          <TextField label="State" variant="outlined" required fullWidth />
          <TextField label="Zip Code" variant="outlined" required fullWidth />
          <TextField label="Phone Number" variant="outlined" required fullWidth />
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 4 }}
          fullWidth
        >
          Place Order
        </Button>
      </Box>
    </Box>
  );
}
