'use client'

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
    Typography,
    Button,
    AppBar,
    Toolbar,
    Container,
  } from "@mui/material";

export default function FcHeader() {
    return (
        <>
        <header className="hidden sm:flex rounded-lg w-full bg-zinc-900/70 backdrop-blur-md text-white h-max flex p-5 place-items-center place-content-center">
        <div className="w-1/2 flex place-items-center justify-between">
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <a href="/">
          <span>  
             Codecards
            </span>
          </a>
        </Typography>
        <SignedOut>
          <div className="flex gap-4">
          <Button className="bg-zinc-800 rounded-lg px-4" color="inherit" href="/sign-in">
            Login
          </Button>
          <Button className="bg-white rounded-lg px-4 text-zinc-900" color="inherit" href="/sign-up">
            Sign Up
          </Button>
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        </div>
        </header>

        <header className="sm:hidden rounded-lg w-full bg-zinc-900/70 backdrop-blur-md text-white h-max flex p-5 place-items-center justify-between">
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <a href="/">
            <span className="text-sm">  
            Codecards
            </span>
            </a>
        </Typography>
        <SignedOut>
          <Button color="inherit" href="/sign-in">
          <span className="text-sm">  
            Login
          </span>
          </Button>
          <Button color="inherit" href="/sign-up">
          <span className="text-sm">  
            Sign Up
          </span>
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        </header>
        </>
        )
    }