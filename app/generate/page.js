"use client";

import { useState } from "react";
import { useUser } from '@clerk/nextjs'
import {db} from '@/firebase'
import { useRouter } from "next/navigation";
import { doc, collection, setDoc, getDoc, writeBatch } from "firebase/firestore";
import { Container, TextField, Button, Typography, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid, Card, CardContent, CardActionArea } from "@mui/material";
import FcHeader from "../fc-components/header";
import './gen.css'
import { motion } from "framer-motion";

export default function Generate() {
  const {isLoaded, isSignedIn, user} = useUser()
  const [text, setText] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [setName, setSetName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mode, setMode] = useState("Text");
  const [videoUrl, setVideoUrl] = useState("");
  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);
  const router = useRouter();

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

    try {
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
      router.push(`/flashcards`);

    } catch (error) {
      console.error("Error saving flashcards:", error);
      alert("An error occurred while saving flashcards. Please try again.");
    }
   };

  const handleSubmit = async (info = {}) => {

    try {
      console.log("info: ", info);
      const response = await fetch("/api/generate", {
        method: "POST",
        body: info,
      });

      if (!response.ok) {
        throw new Error("Failed to generate flashcards");
      }

      const data = await response.json();
      console.log("the DATA: ", data);
      setFlashcards(data);
      // console.log(flashcards);
    } catch (error) {
      console.error("Error generating flashcards:", error);
      alert("An error occurred while generating flashcards. Please try again1.");
    }
  };

  const handleVideoSubmit = async () => {
    
    try {

      // youtube video stuff
      const response = await fetch("/api/transcript", {
        method: "POST",
        body: videoUrl,
      });

      if (!response.ok) {
        throw new Error("Failed to generate flashcards");
      }

      const yttextdata = await response.json();

      // ai stuff
      console.log("starting ai stuff......");
      handleSubmit(yttextdata.concatenatedText);
      console.log("yttextdata", yttextdata.concatenatedText);
      console.log("flashcards", flashcards);
      // console.log(flashcards);
      console.log("finished ai stuff!")
    } catch (error) {
      console.error("Error generating flashcards:", error);
    }
  }

  const handleReset = () => {
  }

  const setVideoUrlHandler = (url) => {
    setVideoUrl(url);
  }

  if (isSignedIn === false) {
    router.push('/sign-in')
  } 

  return (
    <>
    <div className="w-screen h-screen  overflow-y-scroll no-scrollbar">
    <div className="bg-zinc-900 h-screen overflow-y-scroll w-full no-scrollbar">
      
      <FcHeader />

      <div className="w-full p-3 bg-red-500 h-[150px] text-white"></div>

      <div id="gen-container" className="flex place-items-end w-screen place-content-end flex-col">
        <div id="steps-gen" className="text-muted-foreground place-self-end w-max flex flex-col no-scrollbar px-8 h-max">
          <p>You are only a few steps away from your flashcards.</p>
          <p>You can generate flashcards from text or even a <strong><em>Youtube</em></strong> video!</p>
        </div>

        <div id="text-gen" className="w-full text-white no-scrollbar p-8 h-max overflow-y-scroll flex flex-col gap-4">
          <div className="w-full flex justify-between">
            <h1 className="text-3xl" >
              Generate Flashcards
            </h1>

            <div id="mode" className="flex flex-col gap-4">
              <p>Mode</p>
              <div className="w-max gap-4 flex">
                <button onClick={() => setMode('Text')} className={mode === 'Text' ? "bg-white p-3 rounded hover:scale-105 transition-transform text-zinc-900 hover:bg-white font-bold" : "bg-zinc-900 text-white opacity-50 p-3 rounded hover:scale-105 transition-transform hover:bg-black font-bold"}>Text</button>
                <button onClick={() => setMode('Video')} className={mode === 'Video' ? "bg-white p-3 rounded hover:scale-105 transition-transform text-zinc-900 hover:bg-white font-bold" : "bg-zinc-900 text-white p-3 opacity-50 rounded hover:scale-105 transition-transform hover:bg-black font-bold"}>Video</button>
              </div>
            </div>
          </div>

          {mode === 'Text' && (  
          <>  
          <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            ease: "linear",
            duration: 1,
          }}
          >
          <p>Text Mode</p>  
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Enter text"
            multiline="true"
            rows={4}
            variant="outlined"
            placeholder="Enter your text here"
            className="w-full no-scrollbar text-white bg-zinc-900 outline-transparent border-transparent"
            sx={{ mb: 2 }}
          />
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              ease: "linear",
              duration: 1.25,
            }}
            className="bg-white p-3 rounded hover:scale-105 transition-transform text-zinc-900 hover:bg-white font-bold" 
            onClick={() => handleSubmit(text)}
          >
            Generate Flashcards
          </motion.button>

            </>
          )}

          {mode === 'Video' && (
            <> 
            <motion.div
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{
               ease: "linear",
               duration: 1,
             }}
            >
              <p>Video URL Mode</p>
              <input
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                label="Enter video URL"
                multiline="true"
                rows={4}
                variant="outlined"
                placeholder="Enter your video URL here"
                className="w-full no-scrollbar text-white bg-zinc-900 outline-transparent border-transparent"
                />

            </motion.div>

            <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              ease: "linear",
              duration: 1.25,
            }}
            className="bg-white p-3 rounded hover:scale-105 transition-transform text-zinc-900 hover:bg-white font-bold" 
            onClick={handleVideoSubmit}
          >
            Generate Flashcards
            </motion.button>
            </>
          )}



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

    
      </div>

      {flashcards.length > 0 && (
        <div className="text-white bg-zinc-900 p-4" sx={{ mt: 4 }}>
          <div className="w-full my-5 p-8 flex place-items-center place-content-center justify-between">
          <Typography variant="h5" component="h2" gutterBottom>
            Generated Flashcards
          </Typography>
          {flashcards.length > 0 && (

<div className="bg-zinc-900 my-8 flex place-content-center h-[30vh]" sx={{ display: "flex", justifyContent: "center" }}>

  <button onClick={handleOpenDialog} className="bg-white p-3 rounded hover:scale-105 transition-transform text-zinc-900 hover:bg-white font-bold" >
  Save Flashcards
  </button>

</div>
          )}
          </div>
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
        
          <button onClick={handleOpenDialog} className="bg-white p-3 rounded hover:scale-105 transition-transform text-zinc-900 hover:bg-white font-bold" >
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
