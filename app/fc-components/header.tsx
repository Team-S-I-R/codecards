'use client';

import * as React from 'react';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  Typography,
  Button,
  AppBar,
  Toolbar,
} from "@mui/material";

export default function FcHeader() {

  return (
    <>
      <AppBar 
        position="static" 
        className="bg-zinc-900/70 backdrop-blur-md text-white"
      >
        <Toolbar className="flex justify-between items-center">
          <Typography variant="h6" className="flex-grow">
            <a href="/" className="text-white">
              Codecards
            </a>
          </Typography>

          <div className="flex gap-4">
            <Button color="inherit" className="hover:text-gray-300">
              <a href="/generate">Generate</a>
            </Button>
            <Button color="inherit" className="hover:text-gray-300">
              <a href="/flashcards">My Flashcards</a>
            </Button>
            <Button color="inherit" className="hover:text-gray-300">
              <a href="#">My Account</a>
            </Button>
          </div>

          <div className="flex gap-4 ml-4">
            <SignedOut>
              <Button color="inherit" className="bg-zinc-800 rounded-lg px-4">
                <a href="/sign-in" className="text-white">Login</a>
              </Button>
              <Button color="inherit" className="bg-white rounded-lg px-4 text-zinc-900">
                <a href="/sign-up">Sign Up</a>
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </Toolbar>
      </AppBar>

      {/* Mobile Header */}
      <AppBar 
        position="static" 
        className="bg-zinc-900/70 backdrop-blur-md text-white sm:hidden"
      >
        <Toolbar className="flex justify-between items-center">
          <Typography variant="h6" className="flex-grow">
            <a href="/" className="text-white">
              Codecards
            </a>
          </Typography>

          <div className="flex gap-4">
            <Button color="inherit" className="hover:text-gray-300">
              <a href="/generate">Generate</a>
            </Button>
            <Button color="inherit" className="hover:text-gray-300">
              <a href="/flashcards">My Flashcards</a>
            </Button>
            <Button color="inherit" className="hover:text-gray-300">
              <a href="#">My Account</a>
            </Button>
          </div>

          <div className="flex gap-4 ml-4">
            <SignedOut>
              <Button color="inherit">
                <a href="/sign-in" className="text-sm text-white">Login</a>
              </Button>
              <Button color="inherit">
                <a href="/sign-up" className="text-sm">Sign Up</a>
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}
