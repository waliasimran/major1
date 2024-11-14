import React, { useEffect, useState } from 'react';
import { Typography, Grid, Card, CardContent } from '@mui/material';
import axios from 'axios';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/recommendations');
        setRecommendations(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div>
      <Typography variant="h5" gutterBottom>Recommended Connections</Typography>
      <Grid container spacing={2}>
        {recommendations.map(user => (
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

export default Recommendations;