'use client'

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import {db} from '@/firebase'
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Card, CardActionArea, CardContent, Container, Grid, Typography } from "@mui/material";
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

  if (!isLoaded || !isSignedIn) {
    return (
      <>
      <div><p>please sign in</p></div>
    </>

    )
  }

  return (
    <>
    <div className="fc-page-div w-full h-screen">
      <FcHeader/>

      <div className="w-full h-max p-8">
         <span className="text-2xl font-bold text-white">
          Your Flashcards
          </span> 
      </div>

      <div className="w-full h-max  p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {flashcards.map((flashcard: Flashcard,  index) => (
          <div className="w-full h-max " key={index}>
            <div 
            onClick={() => handleCardClick(flashcard.name)}
            className="cursor-pointer hover:scale-105 transform transition w-full h-max p-4 text-white outline outline-2 outline-white rounded-lg">
              <p>{flashcard.name}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
    </>
  );
}
