'use client'

import * as React from 'react';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
    Typography,
    Button,
    AppBar,
    Toolbar,
    Container,
  } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function FcHeader() {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

    return (
        <>
        <header className="hidden select-none sm:flex rounded-lg w-full bg-zinc-900/70 backdrop-blur-md text-white h-max flex p-5 place-items-center place-content-center">
        <div className="w-1/2 flex place-items-center justify-between">
        <div className="flex gap-8 place-items-center">
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <a href="/">
          <span>  
             Codecards
            </span>
          </a>
        </Typography>
        <button onClick={handleClick}>Menu</button>
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => setTimeout(handleClose, 1000)}><a href="/generate">Generate</a></MenuItem>
        <MenuItem onClick={() => setTimeout(handleClose, 1000)}><a href="/flashcards">My Flashcards</a></MenuItem>
        <MenuItem onClick={() => setTimeout(handleClose, 1000)}>My account</MenuItem>
        <MenuItem onClick={() => setTimeout(handleClose, 1000)}>Logout</MenuItem>
        </Menu>
        </div>
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

        <header className="sm:hidden select-none rounded-lg w-full bg-zinc-900/70 backdrop-blur-md text-white h-max flex p-5 place-items-center justify-between">
        <div className="flex gap-8 place-items-center">
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <a href="/">
          <span>  
             Codecards
            </span>
          </a>
        </Typography>
        <button onClick={handleClick}>Menu</button>
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => setTimeout(handleClose, 1000)}><a href="/generate">Generate</a></MenuItem>
        <MenuItem onClick={() => setTimeout(handleClose, 1000)}><a href="/flashcards">My Flashcards</a></MenuItem>
        <MenuItem onClick={()=> setTimeout(handleClose, 1000)}>My account</MenuItem>
        <MenuItem onClick={()=> setTimeout(handleClose, 1000)}>Logout</MenuItem>
        </Menu>
        </div>
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