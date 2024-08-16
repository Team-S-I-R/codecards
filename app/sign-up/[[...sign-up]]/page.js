import React from "react";
import { Container, Box, Typography } from "@mui/material";
import { SignUp } from "@clerk/nextjs";
import FcHeader from "../../fc-components/header"; 

export default function SignUpPage() {
  return (
    <>
      <FcHeader />

      <div className="w-full h-[100px]"></div>

      <Container maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{ textAlign: "center", my: 4, color: "white" }} 
        >
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: "white" }}>
            Sign Up
          </Typography>
          <Box
            sx={{
              "& .clerk-sign-up": {
                color: "white", 
                "& *": {
                  color: "white"
                }
              }
            }}
          >
            <SignUp />
          </Box>
        </Box>
      </Container>
    </>
  );
}
