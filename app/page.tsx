'use client';

import Image from "next/image";
import { Typography, Button, AppBar, Toolbar, Container } from "@mui/material";
import getStripe from "../utils/get-stripe";
import Head from "next/head";
import FcHeader from "./fc-components/header";
import { motion } from "framer-motion";
import { stories } from "./hpdata";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from '@gsap/react'
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";


export default function Home() {
  const handleSubmit = async (model:String) => {
    const checkoutSession = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { origin: "http://localhost:3000"},
      body: JSON.stringify({model: model})
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

  const [activestory, setActiveStory] = useState<number>(0);
  const storyDuration = 7000;
  const contentUpdateDelay = 0.4;
  const [direction, setDirection] = useState("");
  let storyTimeout: any
  const storysrc = stories[activestory]?.storyImg.src
  const [images, setImages] = useState(storysrc);
  const [cursorText, setCursorText] = useState("Next")



  const changeActiveStory = () => {

    setActiveStory(activestory + 1);
    
    if (activestory === stories.length - 2) {
      setActiveStory(0);
    }

    gsap.set(['#f1', '#f2', '#f3', '#f4'], {
      y: 1000,
    })

    gsap.fromTo(".story-img img", {
      x: 5,
      opacity: 50,
      ease: "none",
    }, {
      x: 0,
      opacity: 1,
      ease: "none",
      duration: 0.5,
    });

    gsap.to(['#f1', '#f2', '#f3', '#f4'],{
      y: 0, 
      duration: 1,
      ease: "sine.inOut",
      stagger: 0.1
    })
  
  };

  useEffect(() => {
    const cursor = document.querySelector(".cursor") as HTMLElement

    document.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      gsap.to(".cursor", {
        x: clientX - cursor?.offsetWidth / 2,
        y: clientY - cursor?.offsetHeight / 2,
        ease: "power2.out",
        duration: 0.3,
      })
      const viewportWidth = window.outerWidth;
      if (clientX < viewportWidth / 2) {
        setCursorText("Prev");
        // setDirection("prev");
      } else {
        setCursorText("Next");
        // setDirection("next");
      }

    })
  

  
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      changeActiveStory();
    }, storyDuration);

    // Clean up the timeout when the component unmounts or `activestory` changes
    return () => {
      clearTimeout(timeout);
    };
  }, [activestory]); // This will run every time `activestory` changes
  

  useGSAP(() => {
  
    const tl = gsap.timeline() 

    tl.set(['#header-cont', '#bottom-cont'],{
      opacity: 0,
    })

    tl.to('#overlay', {
      opacity: 0,
      duration: 0.5,
      display: "none",
    })


    tl.to(['#header-cont', '#bottom-cont'],{
      opacity: 1,
      stagger: 0.2,
      duration: 1,
      ease: "power1.out",
    })

  }, [])

  return (
    <div className="w-full h-screen overflow-y-scroll no-scrollbar  text-white">
      
      <div id="overlay"  className="bg-zinc-900 absolute w-full place-items-center place-content-center h-full text-3xl font-bold flex place-self-center z-[200]">Codecards</div>

      <Head>
        <title>CodeCards</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>

      <div className="cursor z-[100] rounded-full pointer-events-none rounded absolute w-[25px] p-4 h-[25px] flex place-items-center place-content-center bg-zinc-900/50 backdrop-blur-md flex flex-col"><p></p></div>

      <div id="header-cont" className="p-3 absolute z-[100] w-full h-max">
      <FcHeader />
      </div>

      {/* left and right section */}
      <div  className="overflow-hidden  relative w-full h-full flex flex-col sm:flex-row place-items-center place-content-center">
        
      <div className="story-img relative bg-zinc-900 z-[-1] story-img w-full h-full"><img  src={stories[activestory]?.storyImg.src}  style={{objectFit: 'cover', objectPosition: 'center'}} className="w-full bg-zinc-900 absolute h-full"  alt=""></img></div>

      <div id="bottom-cont" className="story-content absolute z-[1] p-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col place-items-center place-content-center w-full h-full justify-between ">
        <div className="row pt-[20%] sm:pt-[10%]">
          <div></div>
        </div>
       
        <div className="row flex w-full gap-5 flex-col bg-zinc-900/10 backdrop-blur-md p-5 rounded-lg">
        
          <div className="title">
            <div id="f1" className="title-row text-2xl relative w-full h-max"><h1>{stories[activestory]?.title[0]}</h1></div>
            <div id="f2" className="title-row text-5xl relative w-full h-max"><h1>{stories[activestory]?.title[1]}</h1></div>
            <div id="f3" className="title-row text-1xl relative w-full h-max"><h1>{stories[activestory]?.title[2]}</h1></div>
            <div id="f4" className="title-row text-1xl relative w-full h-max"><h1>{stories[activestory]?.title[3]}</h1></div>
          </div>

          {/* buttons */}
          <div className="w-max gap-5 flex h-max">
            <a href="/generate">
          <button
            id="f5"
            className="mt-4 p-3 rounded bg-white hover:bg-white text-zinc-900 font-bold transform hover:scale-110 transition-transform"
          >
            <span id="f6">

              Get Started
            </span>
          </button>
          </a>
          <a 
          href="/about"
          className="w-max h-max">
          <button
            id="f7"
            className="mt-4 p-3 rounded outline outline-1 outline-whitetext-white transform hover:scale-105 transition-transform"
            >
            <span id="f8">
              Learn More
              </span>
          </button>
            </a>
          </div>
        
        </div>
      </div>

        {/* Left section (welcome) */}
        {/* <motion.div 
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
        className="flex text-center flex-col place-items-center place-content-center my-4 p-5 sm:p-0 w-full sm:w-1/2">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            className="text-white font-extrabold drop-shadow-lg"
          >
            Welcome to Codecards
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            className="text-zinc-100 font-medium"
          >
            The easiest way to create flashcards from your text.
          </Typography>
          <Button
            variant="contained"
            className="mt-4 bg-white hover:bg-white text-zinc-900 font-bold transform hover:scale-110 transition-transform"
            href="/generate"
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            className="mt-6 border-white hover:border-white text-white transform hover:scale-105 transition-transform"
          >
            Learn More
          </Button>
        </motion.div> */}

        {/* Right Side (Features) */}
        {/* <motion.div 
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="flex flex-col place-items-start place-content-start w-full p-5 sm:p-0 sm:w-1/3 sm:ml-10">
          <Typography className="mb-4" variant="h4" component="h2" gutterBottom>
            Features
          </Typography>

          <div className="space-y-4">
            <div className="p-4 flex flex-col rounded bg-zinc-800">
              <Typography variant="h6">Easy Text Input</Typography>
              <Typography>
                Simply input your text and let our software do the rest. Creating
                flashcards has never been easier.
              </Typography>
            </div>
            <div className="p-4 flex flex-col rounded bg-zinc-800">
              <Typography variant="h6">Smart Flashcards</Typography>
              <Typography>
                Our AI intelligently breaks down your text into concise
                flashcards.
              </Typography>
            </div>
            <div className="p-4 flex flex-col rounded bg-zinc-800">
              <Typography variant="h6">Accessible Anywhere</Typography>
              <Typography>
                Access your flashcards from any device, anywhere, at any time.
              </Typography>
            </div>
          </div>
        </motion.div> */}
      </div>

      {/* Pricing Section */}
      <div className="w-full px-9 h-max bg-gradient-to-r from-[#09090b] to-[#27272a] ">
    
      <div className="py-6 p-8 h-max sn:h-[50vh]  w-full flex flex-col">
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          className="text-white py-8"
        >
          Pricing
        </Typography>
        <div className="w-full flex sm:flex-row flex-col place-content-center gap-4">
          {/* free */}
          <div className="sm:w-1/3 w-full flex flex-col p-6 rounded shadow-lg bg-zinc-800 transform hover:scale-105 transition-transform">
            <Typography variant="h5" gutterBottom>
              Free
            </Typography>
            <span className="text-muted-foreground">Access to basic flashcards</span>
            
            <div className="w-full h-max p-5 bg-black my-5 rounded-xl flex place-content-center place-items-center">
            <Typography
              variant="h6"
              gutterBottom
              className="text-white text-3xl"
            >
              $0 / month
            </Typography>
            </div>

            <a className="w-full" href="/generate">
            <button
              className="mt-4 w-full py-2 px-4 rounded  bg-white hover:bg-white text-zinc-900 font-bold"
            >
                GET STARTED
            </button>
            </a>

          </div>
          {/* basic */}
          <div className="sm:w-1/3 w-full flex flex-col p-6 rounded shadow-lg bg-zinc-800 transform hover:scale-105 transition-transform">
            <Typography variant="h5" gutterBottom>
              Basic
            </Typography>
            
            <span className="text-muted-foreground">Everything in Basic plus you are supporting the team!</span>

            <div className="w-full h-max p-5 bg-black my-5 rounded-xl flex place-content-center place-items-center">
              <Typography
                variant="h6"
                gutterBottom
                className="text-white text-3xl"
              >
                $5 / month
              </Typography>         
            </div>

            <button
              onClick={() => handleSubmit("basic")}
              className="mt-4 py-2 px-4  rounded  bg-white hover:bg-white text-zinc-900 font-bold"
            >
               CHOOSE BASIC
            </button>
          </div>
          {/* pro */}
          <div className="sm:w-1/3 w-full flex flex-col p-6 rounded shadow-2xl bg-zinc-700 transform hover:scale-110 transition-transform">
            <Typography variant="h5" gutterBottom>
              Pro
            </Typography>
           

            <span className="text-muted-foreground">Support the team with priority access to new features first!</span>
            
            <div className="w-full h-max p-5 bg-black my-5 rounded-xl flex place-content-center place-items-center">
              <Typography
                variant="h6"
                gutterBottom
                className="text-white text-3xl"
              >
                $10 / month
              </Typography>
            </div>

            <button
              onClick={() => handleSubmit("pro")}
              className="mt-4 px-4 py-2 rounded bg-white  text-zinc-900 font-bold"
            >
              CHOOSE PRO
            </button>


          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full h-[20vh] flex p-5  text-center text-muted-foreground">
        <div className="w-full flex flex-col justify-center items-center">
          <Typography variant="body1">Codecards 2024</Typography>
          <Typography variant="body2">
            Made with love by Shaurya Bisht, Itwela Ibomu, and Rehan Mohideen
          </Typography>
        </div>
      </footer>

      </div>


    </div>
  );
}
