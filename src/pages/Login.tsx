import React, { useEffect, useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import useForm from '../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { setProfile } from '../store/slices/profileSlice';

export default function Login() {
  const { values, handleChange } = useForm({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, error } = useSelector((s: any) => s.auth);

  const [snack, setSnack] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const [errors, setErrors] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  // Validate form before submit
  const validate = () => {
    let valid = true;
    const newErrors = { username: '', password: '' };

    if (!values.username.trim()) {
      newErrors.username = 'Username is required';
      valid = false;
    } else if (values.username.length < 3) {
      newErrors.username = 'Minimum 3 characters required';
      valid = false;
    }

    if (!values.password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (values.password.length < 4) {
      newErrors.password = 'Minimum 4 characters required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // @ts-ignore
    dispatch(login(values.username, values.password));
  };

  useEffect(() => {
    if (user) {
      setLoading(false);
      dispatch(setProfile({ username: user.username }));
      setSnack({
        open: true,
        message: 'Login successful!',
        severity: 'success',
      });
      setTimeout(() => navigate('/dashboard'), 1000);
    } else if (error) {
      setLoading(false);
      setSnack({
        open: true,
        message: error || 'Login failed!',
        severity: 'error',
      });
    }
  }, [user, error, dispatch, navigate]);

  return (
    <Paper sx={{ maxWidth: 480, m: '0 auto', p: 3 }}>
      <Typography variant="h5" mb={2}>
        Login
      </Typography>

      <Box component="form" onSubmit={submit} noValidate>
        <TextField
          label="Username"
          name="username"
          fullWidth
          margin="normal"
          value={values.username}
          onChange={handleChange}
          error={!!errors.username}
          helperText={errors.username}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={values.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>

        <Typography variant="caption" display="block" mt={1}>
          Tip: use <b>admin / password</b>
        </Typography>
      </Box>

      {/* Snackbar Alert */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnack({ ...snack, open: false })}
          severity={snack.severity as any}
          sx={{ width: '100%' }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}