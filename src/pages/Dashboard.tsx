import { Paper, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = useSelector((s: any) => s.auth.user);

  return (
    <Paper sx={{ maxWidth: 600, m: '0 auto', p: 4, textAlign: 'center' }}>
      <Typography variant="h4" mb={2}>
        Welcome, {user?.username || 'Guest'} 👋
      </Typography>
      <Typography color="text.secondary" mb={3}>
        This is your dashboard. You can manage your tasks and update your profile below.
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="center">
        <Button variant="contained" onClick={() => navigate('/todos')}>
          View Tasks
        </Button>
        <Button variant="outlined" onClick={() => navigate('/profile')}>
          Edit Profile
        </Button>
      </Stack>
    </Paper>
  );
}