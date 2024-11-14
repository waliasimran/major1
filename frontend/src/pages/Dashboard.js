import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, TextField, Button, Card, CardContent } from '@mui/material';
import axios from 'axios';
import SearchUsers from '../components/Search/SearchUsers';
import Recommendations from '../components/Recommendations/Recommendations';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users/me');
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts');
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
    fetchPosts();
  }, []);

  const handlePostSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/posts', { content });
      setPosts([res.data, ...posts]);
      setContent('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Welcome, {user && user.name}</Typography>

      {/* Create Post */}
      <TextField
        label="What's on your mind?"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handlePostSubmit} style={{ marginTop: '10px' }}>
        Post
      </Button>

      {/* Recommendations */}
      <Recommendations />

      {/* Search Users */}
      <SearchUsers />

      {/* Display Posts */}
      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        {posts.map(post => (
          <Grid item xs={12} md={6} key={post._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{post.user.name} ({post.user.role})</Typography>
                <Typography variant="body1">{post.content}</Typography>
                <Typography variant="caption">Industry: {post.industry.join(', ')}</Typography>
                <Typography variant="caption" display="block">Region: {post.region}</Typography>
                <Typography variant="caption" display="block">Sentiment: {post.sentiment}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;