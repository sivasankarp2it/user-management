import React from 'react';
import { Paper, TextField, Button, Box, Typography } from '@mui/material';
import useForm from '../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { setProfile } from '../store/slices/profileSlice';

export default function Login(){
  const { values, handleChange } = useForm({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((s: any) => s.auth.error);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // dispatch login thunk
    // @ts-ignore
    dispatch(login(values.username, values.password));
    setTimeout(() => { 
        // quick check to proceed (in real app use useEffect)
      const state = JSON.parse(localStorage.getItem('app_state') || '{}');
      if (state.auth?.user) {
        dispatch(setProfile({ username: state.auth.user.username }));
        console.log('Login successful, redirecting...', state);
        navigate('/dashboard');
      }
    }, 100);
  };

  return (
    <Paper sx={{ maxWidth: 480, m: '0 auto', p: 3 }}>
      <Typography variant="h5" mb={2}>Login</Typography>
      <Box component="form" onSubmit={submit} noValidate>
        <TextField label="Username" name="username" fullWidth margin="normal" value={values.username} onChange={handleChange} />
        <TextField label="Password" name="password" type="password" fullWidth margin="normal" value={values.password} onChange={handleChange} />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Login</Button>
        <Typography variant="caption" display="block" mt={1}>Tip: use <b>admin / password</b></Typography>
      </Box>
    </Paper>
  );
}