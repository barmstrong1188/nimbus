import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signupUser } from '../api/api';
import { Card, CardContent, CardActions, TextField, Button, Typography, Box, useMediaQuery } from '@mui/material';

const Signup = ({ setNotification }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width: 450px)');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupUser({ email, password });
      setNotification('Signup successful! You can now log in.');
      navigate('/login');
    } catch (err) {
      console.error('Signup error', err);
      setError(err.response?.data?.message || 'Signup failed, please try again.');
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      left: '35%',
      borderRadius: '8px',
      padding: '2rem',
      width: '30%',
      filter: 'drop-shadow(4px 4px 8px rgb(147, 184, 206))',
      position: 'fixed'
    }}>
      <Card sx={{ width: isSmallScreen ? '87vw' : 400, backgroundColor: 'rgba(254, 255, 255, 0.95)', boxShadow: 'none' }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom
            sx={{
              color: 'var(--royal-blue)',
              fontFamily: '"Fredoka",serif',
              fontWeight: '550',
              textAlign: 'center',
              zIndex: '2'
            }}>
            SIGN UP
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'var(--royal-blue)',
                    transition: '.33s'
                  },
                }
              }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'var(--royal-blue)',
                    transition: '.33s'
                  },
                }
              }}
            />
            <CardActions sx={{ mt: 1 }}>
              <Button
                sx={{
                  fontFamily: '"Montserrat", serif',
                  marginBottom: '-10px',
                  backgroundSize: '600%',
                  backgroundPositionX: 'left',
                  background: 'linear-gradient(-105deg, rgba(21,212,209,1) 0%, rgba(14,195,250,1) 46%, rgba(26,124,228,1) 90%);',
                  '&:hover': {
                    backgroundPosition: 'right'
                  }
                }}
                type="submit" variant="contained" fullWidth
                className="sign-up-button">
                Sign Up
              </Button>
            </CardActions>
          </form>
        </CardContent>
        <CardContent>
          <Typography
            variant="body2"
            sx={{
              textAlign: 'center',
              fontWeight: '600',
              fontFamily: '"Montserrat",serif'
            }}>
            Already have an account?
            <Link to="/login"
              style={{ textDecoration: 'none', marginLeft: '8px', color: 'var(--royal-blue)' }}
              sx={{ '&:visited': { color: 'inherit' } }}
              className="sign-up-link">
              Log in!
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Signup;