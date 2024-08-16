import React from "react";
import { Container, Box, Typography } from "@mui/material";
import { SignIn } from "@clerk/nextjs";
import FcHeader from "../../fc-components/header"; 

export default function SignInPage() {
  return (
    <>
      <FcHeader />

      <Container maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{ textAlign: "center", my: 4, color: "white" }}
        >
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: "white" }}>
            Sign In
          </Typography>
          <Box
            sx={{
              "& .clerk-sign-in": {
                color: "white",
                "& *": {
                  color: "white"
                }
              }
            }}
          >
            <SignIn />
          </Box>
        </Box>
      </Container>
    </>
  );
}
