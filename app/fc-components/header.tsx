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
              <header className="w-full text-green-400 h-max flex p-5 bg-slate-800 place-items-center justify-between">
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <a href="/">
            Flashcard SaaS
            </a>
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
      </header>
        </>
        )
    }