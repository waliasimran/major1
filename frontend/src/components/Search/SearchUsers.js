import React, { useState } from 'react';
import { TextField, Button, Grid, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';

const SearchUsers = () => {
  const [formData, setFormData] = useState({
    industry: '',
    region: '',
    role: '',
    name: '',
  });

  const [results, setResults] = useState([]);

  const { industry, region, role, name } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.get('http://localhost:5000/api/users/search', { params: formData });
      setResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Industry"
              name="industry"
              value={industry}
              onChange={onChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Region"
              name="region"
              value={region}
              onChange={onChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Role"
              name="role"
              value={role}
              onChange={onChange}
              fullWidth
              select
            >
              <MenuItem value="">Any</MenuItem>
              <MenuItem value="founder">Founder</MenuItem>
              <MenuItem value="investor">Investor</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Name"
              name="name"
              value={name}
              onChange={onChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">Search</Button>
          </Grid>
        </Grid>
      </form>

      {/* Display Results */}
      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        {results.map(user => (
          <Grid item xs={12} md={6} key={user._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{user.name} ({user.role})</Typography>
                <Typography variant="body2">Industry: {user.industry.join(', ')}</Typography>
                <Typography variant="body2">Region: {user.region}</Typography>
                {/* Add more details or actions like "Connect" */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SearchUsers;