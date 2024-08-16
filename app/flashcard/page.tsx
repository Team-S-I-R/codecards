'use client'

import { useUser } from "@clerk/nextjs";
import { Box, Card, CardActionArea, CardContent, Container, Grid, Typography } from "@mui/material"
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import {db} from '@/firebase'
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import FcHeader from "../fc-components/header";

type Flashcard = {
  id: string;
  name: string;
  front: string;
  back: string;
  // Add other properties if needed
};

export default function Flashcard() {
   const { isLoaded, isSignedIn, user } = useUser()
   const [fcName, setFcName] = useState('')
   const [flashcards, setFlashcards] = useState<Flashcard[]>([])
   const [flipped, setFlipped] = useState<{[key: string]: boolean}>({})
 
   const searchParams = useSearchParams()
   const search = searchParams.get('id')

   const handleCardClick = (id: string) => {
      setFlipped((prev) => ({
        ...prev,
        [id]: !prev[id],
      }))
    }

   useEffect(() => {
      async function getFlashcard() {
        if (!search || !user) return
    
        const colRef = doc(collection(doc(collection(db, 'users'), user.id), "flashcardSets"), search)
        const docs = await getDoc(colRef)
        console.log(docs)
        
        const flashcards: Flashcard[] = []
        docs.data()?.flashcards.forEach((doc: any, i: number) => {
          flashcards.push({ id: i, ...doc })
        })
        setFlashcards(flashcards)
        setFcName(docs.id)
      }
      getFlashcard()
    }, [search, user])


    if (!isLoaded || !isSignedIn) {
      return <></>
    }
 

    return (
      <div className="bg-zinc-900 w-full h-screen overflow-y-scroll no-scrollbar">
       <FcHeader />

        <div className="w-full select-none h-max p-8">
        <div className="px-8 my-[100px]">
          <p className="text-2xl font-bold text-white">{fcName}</p>
          <p className="text-muted-foreground">Get to studying!</p>
        </div>

        <div className="text-white w-full h-max grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {flashcards.map((flashcard) => (
            <div className="bg-zinc-900 " key={flashcard.id}>
              <Card className="single-div w-full !text-white ">
                <CardActionArea className="bg-zinc-900" onClick={() => handleCardClick(flashcard.id)}>
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
                                 transform: flipped[flashcard.id] ? 'rotateY(180deg)' : 'rotateY(0deg)',
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
                        <div>
                          <Typography variant="h5" component="div">
                            {flashcard.front}
                          </Typography>
                        </div>
                        <div className="flex w-full h-full overflow-y-scroll no-scrollbar">
                          <Typography variant="h5" component="div">
                            {flashcard.back}
                          </Typography>
                        </div>
                      </div>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          ))}
        </div>
          
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
    )
 }