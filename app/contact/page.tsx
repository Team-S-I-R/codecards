import * as React from 'react';
import { Typography, Box, Link, Grid, Container, Avatar, Card, CardContent } from '@mui/material';
import FcHeader from '../fc-components/header';

export default function ContactPage() {
  return (
    <>
      <FcHeader />

      <Container maxWidth="lg" sx={{ marginTop: '100px', marginBottom: '50px' }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
            Contact Us
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '18px', color: 'white' }}>
            For any inquiries or feedback, please feel free to reach out to us through the following:
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
                <Avatar 
                  alt="Shaurya Bisht"
                  src="../shaurya.jpeg"
                  sx={{ width: 120, height: 120, border: '2px solid white' }}
                />
              </Box>
              <CardContent sx={{ textAlign: 'center', color: 'white' }}>
                <Typography variant="h6">Shaurya Bisht</Typography>
                <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'white' }}>Position Here</Typography>
                <Typography variant="body2" sx={{ color: 'white' }}>
                  <Link href="https://www.linkedin.com/in/shaurya-bisht-6857732b1/" target="_blank" rel="noopener noreferrer" sx={{ color: 'common.white' }}>
                    LinkedIn
                  </Link>{' '}
                  |{' '}
                  <Link href="https://github.com/ssbdragonfly" target="_blank" rel="noopener noreferrer" sx={{ color: 'common.white' }}>
                    GitHub
                  </Link>
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
                <Avatar 
                  alt="Itwela Ibomu"
                  src="../itwela.jpeg"
                  sx={{ width: 120, height: 120, border: '2px solid white' }}
                />
              </Box>
              <CardContent sx={{ textAlign: 'center', color: 'white' }}>
                <Typography variant="h6">Itwela Ibomu</Typography>
                <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'white' }}>Position Here</Typography>
                <Typography variant="body2" sx={{ color: 'white' }}>
                  <Link href="https://www.linkedin.com/in/itwela/" target="_blank" rel="noopener noreferrer" sx={{ color: 'common.white' }}>
                    LinkedIn
                  </Link>{' '}
                  |{' '}
                  <Link href="https://github.com/itwela" target="_blank" rel="noopener noreferrer" sx={{ color: 'common.white' }}>
                    GitHub
                  </Link>
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
                <Avatar 
                  alt="Rehan Mohideen"
                  src="../rehan.jpeg"
                  sx={{ width: 120, height: 120, border: '2px solid white' }}
                />
              </Box>
              <CardContent sx={{ textAlign: 'center', color: 'white' }}>
                <Typography variant="h6">Bob Johnson</Typography>
                <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'white' }}>Position Here</Typography>
                <Typography variant="body2" sx={{ color: 'white' }}>
                  <Link href="https://www.linkedin.com/in/rehan-nagoor-mohideen-6b3156202/" target="_blank" rel="noopener noreferrer" sx={{ color: 'common.white' }}>
                    LinkedIn
                  </Link>{' '}
                  |{' '}
                  <Link href="https://github.com/rehan-code" target="_blank" rel="noopener noreferrer" sx={{ color: 'common.white' }}>
                    GitHub
                  </Link>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 8 }}>
          <Typography variant="h6" gutterBottom sx={{ color: 'white', textAlign: 'center' }}>
            Email Us
          </Typography>
          <Typography variant="body1" sx={{ color: 'white', textAlign: 'center' }}>
            <Link href="mailto:bishtshaurya314@gmail.com" sx={{ color: 'common.white' }}>
              bishtshaurya314@gmail.com
            </Link>
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ color: 'white', textAlign: 'center', mt: 4 }}>
            Project GitHub Repository
          </Typography>
          <Typography variant="body1" sx={{ color: 'white', textAlign: 'center' }}>
            <Link href="https://github.com/Team-S-I-R/codecards" target="_blank" rel="noopener noreferrer" sx={{ color: 'common.white' }}>
              https://github.com/Team-S-I-R/codecards
            </Link>
          </Typography>
        </Box>
      </Container>
    </>
  );
}
