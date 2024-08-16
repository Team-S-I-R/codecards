'use client';

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { db } from '@/firebase';
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Card, CardActionArea, CardContent, Container, Grid, Typography, Box } from "@mui/material";
import FcHeader from "../fc-components/header";

type Flashcard = {
  name: string;
  // Add other properties if needed
};

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  console.log("user", user?.id, user?.emailAddresses[0]);
  const [flashcards, setFlashcards] = useState([]);
  const router = useRouter();

  const handleCardClick = (id: string) => {
    router.push(`/flashcard?id=${id}`);
  };

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return;
      const docRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const collections = docSnap.data().flashcardSets || [];
        setFlashcards(collections);
      } else {
        await setDoc(docRef, { flashcardSets: [] });
      }
    }
    getFlashcards();
  }, [user]);

  if (isSignedIn === false) {
    router.push('/sign-in')
  }

  return (
    <>
      <div className="fc-page-div w-full h-screen bg-black overflow-y-scroll no-scrollbar">
        <FcHeader />

        <Container className="p-8 w-full h-full">

          <div className="w-full h-[150px]"></div>

          <Typography variant="h4" component="h1" gutterBottom className="text-white">
            Your Flashcard Sets
          </Typography>

          {flashcards.length > 0 ? (
            <Grid container spacing={2}>
              {flashcards.map((flashcard: Flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                    <CardContent>
                      <Box
                        sx={{
                          height: '200px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#1c1c1c',
                          borderRadius: 2,
                          boxShadow: 3
                        }}
                      >
                        <Typography variant="h6" className="text-white">
                          {flashcard.name}
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="h6" component="p" className="text-white">
              No flashcards found.
            </Typography>
          )}
        </Container>

        <footer className="w-full h-[20vh] flex p-5 bg-black text-center text-muted-foreground">
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
