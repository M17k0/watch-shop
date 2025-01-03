import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, CircularProgress } from '@mui/material';
import { authService } from '@/services/authService';
import { useNavigate } from 'react-router-dom';
import { InvalidInputError } from '@/errors/InvalidInputError';

export const RegisterPage = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);
    setErrorMessage('');

    try {
      await authService.register({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        phoneNumber,
      });

      navigate('/');
    } catch (error) {
      if (error instanceof InvalidInputError) {
        setErrorMessage('Invalid input.');
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
    }

    setLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 8,
          padding: 3,
          borderRadius: 1,
          boxShadow: 3,
          backgroundColor: 'white',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>
        
        {errorMessage && (
          <Typography color="error" variant="body2" sx={{ marginBottom: 2 }}>
            {errorMessage}
          </Typography>
        )}

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 3 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
          </Button>
        </form>
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <Typography variant="body2">
          Already have an account?{' '}
          <Button variant="text" color="primary" onClick={() => navigate('/login')}>
            Login
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};
