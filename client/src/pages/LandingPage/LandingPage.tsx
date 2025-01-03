import { useCurrentUser } from '@/contexts/CurrentUserContext';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function LandingPage() {
  const user = useCurrentUser();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h2" gutterBottom sx={{ textAlign: 'center' }}>
          Welcome to the Watch Show!
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ textAlign: 'center', marginBottom: 4 }}>
          Discover the best selection of watches that will fit every style and occasion. Whether you're
          looking for something sleek and modern or classic and elegant, we have the perfect watch for you.
        </Typography>
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/watches')}
            sx={{ marginRight: 2 }}
          >
            Shop Now
          </Button>
          { !user && (
            <Button variant="outlined" color="primary" size="large" onClick={() => navigate('/login')}>
              Log In
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
}
