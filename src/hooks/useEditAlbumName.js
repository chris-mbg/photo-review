import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const useEditAlbumName = () => {
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false)
  const [isEditing, setIsEditing] = useState(false);

  const edit = async (albumId, newName) => {
    setError(null);
    setIsError(false)
    setIsEditing(true);

    try {
      const albumRef = doc(db, "albums", albumId);
      await updateDoc(albumRef, {
        name: newName,
      });
      setIsEditing(false)
    } catch (err) {
      setIsError(true)
      setError(err.message);
      setIsEditing(false);
    }
  }

  return { error, isError, isEditing, edit }
}

export default useEditAlbumName