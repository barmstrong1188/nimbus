import React from 'react';
import { Box, Card, CardContent, Typography, Button, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import QueryStatsIcon from '@mui/icons-material/QueryStats';


const Home = () => {
    const isSmallScreen = useMediaQuery('(max-width: 760px)');
    const isMobileScreen = useMediaQuery('(max-width: 460px)');
    return (
        // main home page content starts here
        <Box
            component="main"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '75%',
                maxWidth: '1200px',
                margin: '0 auto'
            }}
        >
            {/* -------hero card with call to action starts here ----------*/}
            <Card
                sx={{
                    maxWidth: 900,
                    p: 2,
                    textAlign: 'center',
                    background: 'linear-gradient(75deg, #1a7ce4, #15d4d1)',
                    boxShadow: '0px 4px 20px rgba(0,0,0,0.2)',
                    borderRadius: '9px',
                    zIndex: '100'
                }}
            >
                <CardContent>
                    <Typography
                        variant="h4"
                        component="h1"
                        gutterBottom
                        sx={{
                            fontFamily: '"Montserrat", serif',
                            color: '#fff',
                            textTransform: 'uppercase',
                            fontWeight: '500',
                            fontSize: isMobileScreen ? '1.5rem' : '1.75rem'
                        }}
                    >
                        Cloud Inventory Management Simplified
                    </Typography>
                    <Typography variant="body1" sx={{ fontFamily: '"Montserrat", serif', mb: 3, color: '#fff', fontSize: isMobileScreen ? '.95rem' : 'auto' }}>
                        Manage your business inventory with ease. Our platform offers intuitive features, secure authentication,
                        and real-time updates to help you stay on top of your stock.
                    </Typography>
                    {/* -------------call to action button starts here------------- */}
                    <Button
                        aria-label="Link to sign up page"
                        className='get-started-button'
                        variant="contained"
                        component={Link}
                        to="/signup"
                        size="large"
                        sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.93)",
                            borderRadius: '6rem',
                            fontWeight: '600',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 4px 20px rgba(255, 252, 252, 0.41)',
                            mb: isMobileScreen ? '2px' : '0'
                        }}
                    >
                        <span
                            style={{
                                background: 'linear-gradient(-95deg, rgba(21,212,209,1) 0%, rgba(14,195,250,1) 6%, rgba(26,124,228,1) 70%)',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                color: 'transparent',
                                fontFamily: '"Fredoka",serif',
                                fontSize: '1.25rem'
                            }}
                        >
                            Get Started
                        </span>
                    </Button>
                </CardContent>
            </Card>
            {/* -------------------WHY NIMBUS? SECTION------------------------- */}
            <Typography
                variant="h4"
                component="h1"
                gutterBottom
                className='why-nimbus-header'
                sx={{
                    fontFamily: '"Montserrat", serif',
                    color: 'var(--royal-blue)',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                    mt: isMobileScreen ? '10%' : '5%',
                    borderBottom: '2px solid var(--royal-blue)',
                    fontSize: '1.75rem'
                }}>
                Why Nimbus?
            </Typography>
            {/* -------------------gradient section container------------------ */}
            <Card
                sx={{
                    maxWidth: 900,
                    p: 3,
                    mt: 3,
                    mb: 3,
                    textAlign: 'center',
                    background: isMobileScreen ? 'linear-gradient(78deg, #1a7ce4, #15d4d1)' : 'linear-gradient(55deg, #1a7ce4, #15d4d1)',
                    boxShadow: '0px 4px 20px rgba(0,0,0,0.2)',
                    borderRadius: '9px',
                    zIndex: '100'
                }}
            >
                <CardContent>
                    {/* ---------------------Glass cards ---------------------*/}
                    <div className="bullet-cards">
                        {/* ------First glass card--------- */}
                        <Card sx={{
                            p: 2,
                            height: isSmallScreen ? 'fit-content' : 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            borderRadius: '8px',
                            backgroundColor: "rgba(255, 255, 255, 0.23)",
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            backdropFilter: 'blur(40px)',
                            WebkitBackdropFilter: 'blur(40px)',
                            color: '#fff',
                            boxShadow: '0 4px 10px rgba(255, 252, 252, 0.41), inset 0 4px 20px rgba(255, 252, 252, 0.41)',
                            '@media (max-width: 760px)': {
                                flexDirection: 'row'
                            },
                            '@media (max-width: 560px)': {
                                flexDirection: 'column'
                            }
                        }}>
                            <VerifiedUserIcon sx={{ fontSize: '6rem', mt: '1rem' }} >
                            </VerifiedUserIcon>
                            <Typography variant="body1" sx={{ fontFamily: '"Montserrat", serif', mb: 1 }}>
                                • Secure user authentication with JWT
                            </Typography>
                        </Card>
                        {/* ------Middle glass card--------- */}
                        <Card sx={{
                            p: 2,
                            m: '0 4%',
                            height: isSmallScreen ? 'fit-content' : 'auto',
                            flexDirection: isSmallScreen ? 'row' : 'column',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            borderRadius: '8px',
                            backgroundColor: "rgba(255, 255, 255, 0.23)",
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            backdropFilter: 'blur(40px)',
                            WebkitBackdropFilter: 'blur(40px)',
                            color: '#fff',
                            boxShadow: '0 4px 10px rgba(255, 252, 252, 0.41), inset 0 4px 20px rgba(255, 252, 252, 0.41)',
                            '@media (max-width: 760px)': {
                                flexDirection: 'row',
                                m: '4% 0'
                            },
                            '@media (max-width: 560px)': {
                                flexDirection: 'column',
                                m: '8% 0'
                            }
                        }}>
                            <DynamicFormIcon sx={{ fontSize: '6rem', mt: '1rem' }} />
                            <Typography variant="body1" sx={{ fontFamily: '"Montserrat", serif', mb: 1 }}>
                                • Quick and easy product management
                            </Typography>
                        </Card>
                        {/* ------Last glass card--------- */}
                        <Card sx={{
                            p: 2,
                            maxWidth: isSmallScreen ? '100%' : '31%',
                            display: 'flex',
                            height: isSmallScreen ? 'fit-content' : 'auto',
                            flexDirection: isSmallScreen ? 'row' : 'column',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            borderRadius: '8px',
                            backgroundColor: "rgba(255, 255, 255, 0.23)",
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            backdropFilter: 'blur(40px)',
                            WebkitBackdropFilter: 'blur(40px)',
                            color: '#fff',
                            boxShadow: '0 4px 10px rgba(255, 252, 252, 0.41), inset 0 4px 20px rgba(255, 252, 252, 0.41)',
                            '@media (max-width: 760px)': {
                                flexDirection: 'row'
                            },
                            '@media (max-width: 560px)': {
                                flexDirection: 'column'
                            }
                        }}>
                            <QueryStatsIcon sx={{ fontSize: '6rem', mt: '1rem' }} />
                            <Typography variant="body1" sx={{ fontFamily: '"Montserrat", serif' }}>
                                • Real-time inventory updates and analytics
                            </Typography>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Home;
