import Image from "next/image";
import {
  Typography,
  Button,
  AppBar,
  Toolbar,
  Box,
  Grid,
  Container,
} from "@mui/material";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import getStripe from "../utils/get-stripe";
import Head from "next/head";

export default function Home() {
  const handleSubmit = async () => {
    const checkoutSession = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { origin: "http://localhost:3000" },
    });
    const checkoutSessionJson = await checkoutSession.json();

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  return (
    <Container maxWidth="100vw">
      <Head>
        <title> CODECARDS </title>
        <meta name="description" content="Create flashcard from your text" />
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">
              Login
            </Button>
            <Button color="inherit" href="/sign-up">
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Flashcard SaaS
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          The easiest way to create flashcards from your text.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, mr: 2 }}
          href="/generate"
        >
          Get Started
        </Button>
        <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
          Learn More
        </Button>
      </Box>

      <Box sx={{ my: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Easy Text Input</Typography>
            <Typography>{' '}Simply inout your txt and let our softweare do the rest. Creating 
              flashcards has never been easier
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Smart Flashcards</Typography>
            <Typography>
              {' '}
              Our AI intelligently breaks down your text into concise
              flashcards
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Accessible Anywhere</Typography>
            <Typography>
              {' '}
              Lorem Ipsum
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Pricing
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box sx={{
              p:3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2
            }}>
              <Typography variant="h5" gutterBottom>Basic</Typography>
              <Typography variant="h6" gutterBottom>$5 / month</Typography>
              <Typography>
                {' '}
                Lorem Ipsum
              </Typography>
              <Button variant="contained" color="primary" sx={{mt: 2}}>
                Choose Basic
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p:3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2
            }}>
              <Typography variant="h5" gutterBottom>Pro</Typography>
              <Typography variant="h6" gutterBottom>$10 / month</Typography>
              <Typography>
                {' '}
                Lorem Ipsum
              </Typography>
              <Button variant="contained" color="primary" sx={{mt: 2}}>
                Choose Basic
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

    </Container>

    // <main className="w-full h-screen bg-slate-900 text-green-300">

    //   <div className="w-full h-full overflow-y-scroll">

    //   {/* <section className="w-full h-full">
    //     <div className="w-full h-full flex sm:flex-row flex-col place-content-center place-items-center">

    //       <div className="sm:w-1/2 sm:h-full w-full h-1/2 flex place-content-center place-items-center">
    //         <h1>Image will go here</h1>
    //       </div>

    //       <div className="sm:w-1/2 sm:h-full w-full h-1/2 flex flex-col place-content-center place-items-center">
    //         <h1>CodeCards</h1>
    //         <h1>Landing Page text</h1>
    //       </div>

    //     </div>
    //   </section> */}

    //   {/* <section className="w-full h-full">
    //     <div className="w-full h-full flex sm:flex-row flex-col place-content-center place-items-center">

    //       <div className="sm:w-1/2 sm:h-full w-full h-1/2 flex place-content-center place-items-center">
    //         <h1>Image will go here</h1>
    //       </div>

    //       <div className="sm:w-1/2 sm:h-full w-full h-1/2 flex flex-col place-content-center place-items-center">
    //         <h1>CodeCards</h1>
    //         <h1>Landing Page text</h1>
    //       </div>

    //     </div>
    //   </section> */}

    //   </div>

    // </main>
  );
}
