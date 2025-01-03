import { useCart } from '@/contexts/CartContext';
import { Order, orderService } from '@/services/orderService';
import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Payment } from '../../components/Payment/Payment';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAsyncAction } from '@/hooks/useAsyncAction';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [isPaying, setIsPaying] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    email: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
  });

  const { perform } = useAsyncAction(orderService.placeOrder);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const onPaymentSuccess = async () => {
    const order: Order = {
      userEmail: formData.email,
      userAddress: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.zipCode}`,
      userPhone: formData.phoneNumber,
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    try {
      await perform(order);
      clearCart();
      toast.success('Order placed successfully');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      toast.error('Error placing order. Please try again later.');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPaying(true);
    // onPaymentSuccess();
  };

  return (
    <>
      <Toaster />
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>
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
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
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
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0,
                  )
                  .toFixed(2)}
              </Typography>
            </Box>
          )}
        </Box>

        {!isPaying && (
          <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: 4 }}>
            <Typography variant="h6" gutterBottom>
              Shipping Details
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Full Name"
                name="fullName"
                variant="outlined"
                required
                fullWidth
                value={formData.fullName}
                onChange={handleChange}
              />
              <TextField
                label="Email Address"
                name="email"
                type="email"
                variant="outlined"
                required
                fullWidth
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                label="Address"
                name="address"
                variant="outlined"
                required
                fullWidth
                value={formData.address}
                onChange={handleChange}
              />
              <TextField
                label="City"
                name="city"
                variant="outlined"
                required
                fullWidth
                value={formData.city}
                onChange={handleChange}
              />
              <TextField
                label="State"
                name="state"
                variant="outlined"
                required
                fullWidth
                value={formData.state}
                onChange={handleChange}
              />
              <TextField
                label="Zip Code"
                name="zipCode"
                variant="outlined"
                required
                fullWidth
                value={formData.zipCode}
                onChange={handleChange}
              />
              <TextField
                label="Phone Number"
                name="phoneNumber"
                type="tel"
                variant="outlined"
                required
                fullWidth
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </Box>
            {!isPaying && (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginTop: 4 }}
                fullWidth
              >
                Continue to Payment
              </Button>
            )}
          </Box>
        )}
        {isPaying && (
          <Button
            type="button"
            variant="contained"
            color="primary"
            sx={{ marginTop: 4 }}
            fullWidth
            onClick={() => setIsPaying(false)}
          >
            Back to Shipping Details
          </Button>
        )}
        {isPaying && <Payment onPaymentSuccess={onPaymentSuccess} />}
      </Box>
    </>
  );
}
