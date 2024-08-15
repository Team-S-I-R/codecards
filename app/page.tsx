'use client';

import Image from "next/image";
import {
  Typography,
  Button,
  AppBar,
  Toolbar,
  Container,
} from "@mui/material";
import getStripe from "../utils/get-stripe";
import Head from "next/head";
import FcHeader from "./fc-components/header";

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
    <div className="w-full h-screen overflow-y-scroll no-scrollbar bg-slate-900 text-green-400">
      <Head>
        <title>CodeCards</title>
        <meta name="description" content="Create flashcard from your text" />
      </Head>

      <FcHeader />

<div className="w-full h-full flex place-items-center place-content-center">
     
      {/* left */}
      <div className="flex w-1/2 flex-col place-items-center place-content-center">
        {/* feature */}
        <Typography className="my-6" variant="h4" component="h2" gutterBottom>
          Features
        </Typography>

        <div className="my-6 w-max  place-items-center place-content-center flex flex-col">
          <div className="w-1/2 my-4 p-4 flex flex-col  rounded">
            <Typography variant="h6">Easy Text Input</Typography>
            <Typography>Simply inout your txt and let our softweare do the rest. Creating 
              flashcards has never been easier
            </Typography>
          </div>
          <div className="w-1/2 my-4 p-4 flex flex-col rounded">
            <Typography variant="h6">Smart Flashcards</Typography>
            <Typography>
              Our AI intelligently breaks down your text into concise
              flashcards
            </Typography>
          </div>
          <div className="w-1/2 my-4 p-4 flex flex-col rounded">
            <Typography variant="h6">Accessible Anywhere</Typography>
            <Typography>
              Lorem Ipsum
            </Typography>
          </div>
        </div>
      </div>

      {/* right */}
      <div className="flex text-center flex-col place-items-center place-content-center my-4 w-1/2">
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Codecards
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          The easiest way to create flashcards from your text.
        </Typography>
        <Button
          variant="contained"
          className="mt-2 bg-green-400 hover:bg-green-500 text-slate-900 font-bold"
          href="/generate"
        >
          Get Started
        </Button>
        <Button variant="outlined" className="mt-2 border-green-400 hover:border-green-500 text-green-400">
          Learn More
        </Button>
      </div>

        {/* right */}
        <div className="flex flex-col place-items-start place-content-start w-1/3 ml-10">
          <Typography className="mb-4" variant="h4" component="h2" gutterBottom>
            Features
          </Typography>

          <div className="space-y-4">
            <div className="p-4 flex flex-col rounded bg-slate-800">
              <Typography variant="h6">Easy Text Input</Typography>
              <Typography>
                Simply input your text and let our software do the rest. Creating
                flashcards has never been easier.
              </Typography>
            </div>
            <div className="p-4 flex flex-col rounded bg-slate-800">
              <Typography variant="h6">Smart Flashcards</Typography>
              <Typography>
                Our AI intelligently breaks down your text into concise
                flashcards.
              </Typography>
            </div>
            <div className="p-4 flex flex-col rounded bg-slate-800">
              <Typography variant="h6">Accessible Anywhere</Typography>
              <Typography>
                Access your flashcards from any device, anywhere, at any time.
              </Typography>
            </div>
          </div>
        </div>
      </div>

       {/* pricing  */}
      <div className="my-6 py-8 h-[50vh] text-center w-full flex flex-col">
        <Typography variant="h4" component="h2" gutterBottom>
          Pricing
        </Typography>
        <div className="w-full flex place-content-center justify-evenly">
          <div className="p-3 rounded">
            <Typography variant="h5" gutterBottom>
              Basic
            </Typography>
            <Typography variant="h6" gutterBottom>
              $5 / month
            </Typography>
            <Typography>Lorem Ipsum</Typography>
            <Button
              onClick={handleSubmit}
              variant="contained"
              className="mt-2 bg-green-400 hover:bg-green-500 text-slate-900 font-bold"
            >
              Choose Basic
            </Button>
          </div>
          <div className="p-3 rounded">
            <Typography variant="h5" gutterBottom>
              Pro
            </Typography>
            <Typography variant="h6" gutterBottom>
              $10 / month
            </Typography>
            <Typography>Lorem Ipsum</Typography>
            <Button
              onClick={handleSubmit}
              variant="contained"
              className="mt-2 bg-green-400 hover:bg-green-500 text-slate-900 font-bold"
            >
              Choose Pro
            </Button>
          </div>
        </div>
      </div>

      {/* footer */}
      <footer className="w-full h-[30vh] flex p-5 bg-slate-800">

      </footer>

    </div>
  );
}
