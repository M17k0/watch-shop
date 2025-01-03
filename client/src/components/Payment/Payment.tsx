import { useEffect, useState } from 'react';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { config } from '@/config';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { httpService } from '@/services/httpService';

const stripePromise = loadStripe(config.stripePublicKey);

const PaymentForm = ({ onPaymentSuccess }: PaymentProps) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const { result } = await httpService.post<{ clientSecret: string }>(
          '/create-payment-intent',
          {},
        );
        setClientSecret(result.clientSecret || null);
      } catch (error) {
        console.error('Error fetching client secret:', error);
      }
    };
    createPaymentIntent();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      console.error('Stripe or Elements not loaded, or clientSecret is null.');
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.error('CardElement is not loaded.');
      return;
    }

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      },
    );

    setLoading(false);

    if (error) {
      console.error('Payment failed:', error.message);
    } else if (paymentIntent?.status === 'succeeded') {
      onPaymentSuccess();
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        margin: '0 auto',
        padding: 3,
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
      }}
    >
      <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
        Complete Payment
      </Typography>
      <Box
        sx={{
          padding: 2,
          border: '1px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </Box>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        disabled={!stripe || !clientSecret || loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Pay Now'}
      </Button>
    </Box>
  );
};

interface PaymentProps {
  onPaymentSuccess: () => void;
}

export const Payment = ({ onPaymentSuccess }: PaymentProps) => (
  <Elements stripe={stripePromise}>
    <PaymentForm onPaymentSuccess={onPaymentSuccess} />
  </Elements>
);
