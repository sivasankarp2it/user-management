import { useState } from 'react';
import { Paper, TextField, Button, Box, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import useForm from '../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '../store/slices/profileSlice';

export default function Profile() {
  const profile = useSelector((s: any) => s.profile);
  const dispatch = useDispatch();

  const { values, handleChange, setValues } = useForm({
    username: profile.username || '',
    email: profile.email || '',
    role: profile.role || 'employee', // default role
  });

  const [errors, setErrors] = useState({ username: '', email: '' });

  const validate = () => {
    const newErrors = { username: '', email: '' };
    let isValid = true;

    if (!values.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    } else if (values.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
      isValid = false;
    }

    if (!values.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = 'Enter a valid email address';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!validate()) return;
    console.log('Submitting profile:', values);
    dispatch(setProfile(values));
    alert('Profile updated successfully!');
  };

  return (
    <Paper sx={{ maxWidth: 480, m: '0 auto', p: 3 }}>
      <Typography variant="h5" mb={2}>
        Edit Profile
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
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
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          value={values.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>User Role</InputLabel>
          <Select
            label="User Role"
            name="role"
            value={values.role}
            onChange={(e) => setValues({ ...values, role: e.target.value })}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
            <MenuItem value="employee">Employee</MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Save
        </Button>
      </Box>
    </Paper>
  );
}