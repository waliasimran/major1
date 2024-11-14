import React, { useState } from 'react';
import { Container, TextField, Button, Typography, MenuItem } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const roles = [
  { value: 'founder', label: 'Founder' },
  { value: 'investor', label: 'Investor' },
];

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    industry: '',
    region: '',
  });

  const navigate = useNavigate();

  const { name, email, password, role, industry, region } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response.data);
      // Handle errors appropriately
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Register</Typography>
      <form onSubmit={onSubmit}>
        <TextField
          label="Name"
          name="name"
          value={name}
          onChange={onChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={onChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={onChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          select
          label="Role"
          name="role"
          value={role}
          onChange={onChange}
          fullWidth
          margin="normal"
          required
        >
          {roles.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Industry"
          name="industry"
          value={industry}
          onChange={onChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Region"
          name="region"
          value={region}
          onChange={onChange}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    </Container>
  );
};

export default Register;