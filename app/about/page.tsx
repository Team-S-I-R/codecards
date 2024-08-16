'use client';

import React from 'react';
import FcHeader from '../fc-components/header';
import { Container, Typography, Box, Grid, Avatar, Card, CardContent } from '@mui/material';

export default function About() {
  return (
    <>
      <FcHeader />

      <Container maxWidth="lg" sx={{ marginTop: '100px', marginBottom: '50px' }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
            About Us
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '18px', color: 'white' }}>
            We are a passionate team dedicated to creating the best AI-powered flashcard studying solutions for all people, from students to professionals. This project started development in mid-August 2024. The project is a free and open-source project built on top of Clerk, Stripe, React, Next.js, TS, JS, Tailwind CSS, and Firebase.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
                <Avatar 
                  alt="Team Member 1"
                  src="../assets/study1.jpg"
                  sx={{ width: 120, height: 120, border: '2px solid white' }}
                />
              </Box>
              <CardContent sx={{ textAlign: 'center', color: 'white' }}>
                <Typography variant="h6">Shaurya Bisht</Typography>
                <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'white' }}>Position Here</Typography>
                <Typography variant="body2" sx={{ color: 'white' }}>
                  Shaurya!
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
                <Avatar 
                  alt="Team Member 2"
                  src="../assets/study2.jpg"
                  sx={{ width: 120, height: 120, border: '2px solid white' }}
                />
              </Box>
              <CardContent sx={{ textAlign: 'center', color: 'white' }}>
                <Typography variant="h6">Itwela Ibomu</Typography>
                <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'white' }}>Position Here</Typography>
                <Typography variant="body2" sx={{ color: 'white' }}>
                  Itwela!
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
                <Avatar 
                  alt="Team Member 3"
                  src="../assets/study3.jpg"
                  sx={{ width: 120, height: 120, border: '2px solid white' }}
                />
              </Box>
              <CardContent sx={{ textAlign: 'center', color: 'white' }}>
                <Typography variant="h6">Rehan Mohideen</Typography>
                <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'white' }}>Position Here</Typography>
                <Typography variant="body2" sx={{ color: 'white' }}>
                    Rehan!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
