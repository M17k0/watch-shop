import { useEffect, useState } from 'react';
import { useCurrentUser } from '@/contexts/CurrentUserContext';
import { orderService, SimpleOrder } from '@/services/orderService';
import { 
  Box, 
  Typography, 
  Table, 
  TableHead, 
  TableBody, 
  TableCell, 
  TableRow, 
  CircularProgress, 
  Paper 
} from '@mui/material';

export function OrdersPage() {
  const user = useCurrentUser();
  const [orders, setOrders] = useState<SimpleOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user?.userId) {
        try {
          setLoading(true);
          setError(null);

          const ordersData = await orderService.getOrders(user.userId.toString());
          
          setOrders(ordersData);
        } catch (err) {
          setError("Failed to fetch orders. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Orders
      </Typography>

      {loading && <CircularProgress color="primary" />}

      {error && (
        <Typography variant="body1" color="error" sx={{ marginTop: 2 }}>
          {error}
        </Typography>
      )}

      {!loading && !error && orders.length === 0 && (
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          No orders found.
        </Typography>
      )}

      {!loading && !error && orders.length > 0 && (
        <Paper elevation={3} sx={{ marginTop: 2 }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="subtitle1">Order Number</Typography></TableCell>
                <TableCell align="right"><Typography variant="subtitle1">Total Price</Typography></TableCell>
                <TableCell align="right"><Typography variant="subtitle1">Email</Typography></TableCell>
                <TableCell align="right"><Typography variant="subtitle1">Address</Typography></TableCell>
                <TableCell align="right"><Typography variant="subtitle1">Phone</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.orderNumber}>
                  <TableCell>{order.orderNumber}</TableCell>
                  <TableCell align="right">${order.totalPrice}</TableCell>
                  <TableCell align="right">{order.userEmail}</TableCell>
                  <TableCell align="right">{order.userAddress}</TableCell>
                  <TableCell align="right">{order.userPhone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
}
