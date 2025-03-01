import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/api';
import { AuthContext } from '../context/AuthContext';
import { Card, CardContent, CardActions, TextField, Button, Typography, Box } from '@mui/material';

const Login = ({ setNotification }) => {
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      localStorage.setItem('jwtToken', response.data.token);
      login(response.data.token, { email });
      setNotification('Login successful!');
      navigate('/products');
    } catch (err) {
      setError('Invalid credentials, please try again.');
      console.error(err);
    }
  };

  return (
    <Box sx={{ display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  flexDirection: 'column',
                  left: '35%',
                //   margin: 'auto', 
                //   background: 'linear-gradient(-105deg, rgba(21,212,209,1) 0%, rgba(14,195,250,1) 6%, rgba(26,124,228,1) 90%);', 
                  borderRadius: '8px', 
                  padding: '2rem' ,
                  width: '30%',
                  filter: 'drop-shadow(4px 4px 8px rgb(147, 184, 206))',
                  zIndex: 1200,
                  position: 'fixed'
                  }}>
      <Card sx={{ width: 400, backgroundColor: 'rgba(254, 255, 255, 0.95)', boxShadow:'none'}}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom 
                    sx={{color:'var(--royal-blue)', 
                        fontFamily: '"Fredoka",serif', 
                        fontWeight: '550', 
                        textAlign: 'center',
                        zIndex: '2'
                        }}>
            LOGIN
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
                sx={{fontFamily: '"Montserrat", serif', 
                    backgroundSize: '600%',
                    backgroundPositionX: 'left',
                    background: 'linear-gradient(-105deg, rgba(21,212,209,1) 0%, rgba(14,195,250,1) 6%, rgba(26,124,228,1) 90%);',
                    '&:hover' : {
                        backgroundPosition: 'right'
                    }
                    }}
                type="submit" variant="contained" fullWidth
                className="login-button">
                Login
              </Button>
            </CardActions>
          </form>
        </CardContent>
        <CardContent>
          <Typography 
          variant="body2"
          sx={{
            textAlign:'center',
            fontWeight:'600',
            fontFamily: '"Montserrat",serif',
            marginTop: '-10px'
          }}>
            Don't have an account?  
            <Link to="/signup" 
            style={{textDecoration: 'none', marginLeft:'8px', color: 'var(--royal-blue)'}} 
            sx={{'&:visited':{color: 'inherit'}}}
            className="sign-up-link">
            Sign Up!
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;