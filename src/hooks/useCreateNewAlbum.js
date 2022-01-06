import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";

const useCreateNewAlbum = () => {
  const { currentUser } = useAuthContext();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const create = async (
    albumName,
    preselectedImages = null,
    reviewOptions = {}
  ) => {
    setError(null);

    try {
      setLoading(true);

      const docRef = await addDoc(collection(db, "albums"), {
        name: albumName,
        images: preselectedImages ?? [],
        viewId: uuid(),
        owner: reviewOptions.reviewedAlbumOwner ?? currentUser.uid,
        createdAt: serverTimestamp(),
        reviewed: [],
      });

      console.log("doc ref", docRef);

      // When reviewing --> add timestamp to the reviewed album
      if (reviewOptions.review) {
        console.log("Adding review timestamp...")
        console.log("review opts", reviewOptions)
        const albumRef = doc(db, "albums", reviewOptions.reviewedAlbumId);
        await updateDoc(albumRef, { reviewed: arrayUnion(new Date().toLocaleString("sv-SV")) });
      }

      setLoading(false);
      return docRef;
    } catch (err) {

      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  return { loading, error, create };
};

export default useCreateNewAlbum;
