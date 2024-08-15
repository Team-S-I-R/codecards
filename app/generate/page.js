"use client";

import { useState } from "react";
import { useUser } from '@clerk/nextjs'
import db from '@/firebase'
import { useRouter } from "next/router";
import { doc, collection, setDoc, getDoc, writeBatch } from "firebase/firestore";
import { Container, TextField, Button, Typography, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid, Card, CardContent, CardActionArea } from "@mui/material";
import FcHeader from "../fc-components/header";

export default function Generate() {
   const {isLoaded, isSignedIn, user} = useUser()
  const [text, setText] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [setName, setSetName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  const handleCardClick = (id) => {
   setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id]
   }))
  }

  const saveFlashcards = async () => {
    if (!setName.trim()) {
      alert("Please enter a name for your flashcard set.");
      return;
    }

   //  try {
      const userDocRef = doc(collection(db, "users"), user.id);
      const userDocSnap = await getDoc(userDocRef);

      const batch = writeBatch(db);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const updatedSets = [
          ...(userData.flashcardSets || []),
          { name: setName },
        ];
        batch.update(userDocRef, { flashcardSets: updatedSets });
      } else {
        batch.set(userDocRef, { flashcardSets: [{ name: setName }] });
      }

      const setDocRef = doc(collection(userDocRef, "flashcardSets"), setName);
      batch.set(setDocRef, { flashcards });

      await batch.commit();

      alert("Flashcards saved successfully!");
      handleCloseDialog();
      setSetName("");
   //  } catch (error) {
   //    console.error("Error saving flashcards:", error);
   //    alert("An error occurred while saving flashcards. Please try again.");
   //  }
  };

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert("Please enter some text to generate flashcards.");
      return;
    }

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: text,
      });

      if (!response.ok) {
        throw new Error("Failed to generate flashcards");
      }

      const data = await response.json();
      setFlashcards(data);
      console.log(flashcards);
    } catch (error) {
      console.error("Error generating flashcards:", error);
      alert("An error occurred while generating flashcards. Please try again1.");
    }
  };

  const handleReset = () => {
  }


  return (
    <>
    <div className="w-full h-screen overflow-y-scroll no-scrollbar">
    <div className="w-full bg-zinc-900 h-screen overflow-y-scroll no-scrollbar">
      
      <FcHeader />

      <div className="text-white no-scrollbar bg-zinc-900 p-8 w-screen h-max overflow-y-scroll">
        <Typography variant="h4" component="h1" gutterBottom>
          Generate Flashcards
        </Typography>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          label="Enter text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          placeholder="Enter your text here"
          className="w-full no-scrollbar text-white bg-zinc-900 outline-transparent border-transparent"
          sx={{ mb: 2 }}
        />

        <button
          className="bg-white w-full p-2 rounded hover:scale-105 transition-transform text-zinc-900 hover:bg-white font-bold" 
          onClick={handleSubmit}
          fullWidth
        >
          Generate Flashcards
        </button>

        {/* {flashcards.map((flashcard, index) => (
                <div>
                <div>
                  <Typography variant="h5">{flashcard.front}</Typography>
                </div>
                <div>
                  <Typography variant="h5">{flashcard.back}</Typography>
                </div>
            </div>
       
            ))} */}

      </div>

      {flashcards.length > 0 && (
        <div className="text-white bg-zinc-900 p-4" sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Generated Flashcards
          </Typography>
          <Grid container spacing={2}>
            {flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <div>
                  <CardActionArea
                     onClick={() => handleCardClick(index)}
                  >
                     <CardContent>
                        <Box
                           sx={{
                              perspective: `1000px`,
                              '& > div': {
                                 transition: 'transform 0.6s',
                                 transformStyle: 'preserve-3d',
                                 position: 'relative',
                                 width: '100%',
                                 height: '200px',
                                 boxShadow: '0 4px 8px 0 rgba(0,0,0,0,2)',
                                 transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                              },
                              '& > div > div': {
                                 position: 'absolute',
                                 width: '100%',
                                 height: '100%',
                                 backfaceVisibility: 'hidden',
                                 display: 'flex',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 padding: 2,
                                 boxSizing: 'border-box',
                              },
                              '& > div > div:nth-of-type(2)': {
                                 transform: 'rotateY(180deg)',
                              }
                           }}
                        >
                           
                           <div>
                              <div className="">
                                 <Typography variant="h5">{flashcard.front}</Typography>
                              </div>
                              <div className="overflow-y-scroll no-scrollbar">
                                 <Typography variant="h5">{flashcard.back}</Typography>
                              </div>
                           </div>

                        </Box>
                     </CardContent>
                  </CardActionArea>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      )}

      {flashcards.length > 0 && (

        <div className="bg-zinc-900 my-8 flex place-content-center h-[30vh]" sx={{ display: "flex", justifyContent: "center" }}>
        
          <button className="bg-white h-[40px] text-zinc-900 hover:bg-white font-bold"  onClick={handleReset}>
          Save Flashcards
          </button>
        </div>
      )}

      <Dialog className="p-4 m-4" open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle className="p-2">Save Flashcard Set</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your flashcard set.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Set Name"
            type="text"
            fullWidth
            value={setName}
            onChange={(e) => setSetName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={saveFlashcards} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>


    </div>
    <footer className="w-full h-[20vh] flex p-5 bg-zinc-900  text-center text-muted-foreground">
        <div className="w-full flex flex-col justify-center items-center">
          <Typography variant="body1">Codecards 2024</Typography>
          <Typography variant="body2">
            Made with love by Shaurya Bisht, Itwela Ibomu, and Rehan Mohideen
          </Typography>
        </div>
    </footer>
    </div>
      </>
  );
}
