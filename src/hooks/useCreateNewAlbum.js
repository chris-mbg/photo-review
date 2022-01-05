import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { v4 as uuid } from "uuid";

const useCreateNewAlbum = () => {
  const { currentUser } = useAuthContext();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const create = async (albumName, preselectedImages = null) => {
    setError(null);

    try {
      setLoading(true);

      const docRef = await addDoc(collection(db, "albums"), {
        name: albumName,
        images: preselectedImages ? preselectedImages : [],
        viewId: uuid(),
        owner: currentUser.uid,
        createdAt: serverTimestamp(),
        reviewed: [],
      });

      console.log("doc ref", docRef);
      setLoading(false);
      return docRef

    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null
    }

  }

  return { loading, error, create }
}

export default useCreateNewAlbum