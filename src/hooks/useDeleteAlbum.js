import { useState } from "react";
import { db } from "../firebase";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { useAuthContext } from "../contexts/AuthContext";
import useDeletePhoto from "./useDeletePhoto";

const useDeleteAlbum = () => {
  const { currentUser } = useAuthContext();
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const deletePhoto = useDeletePhoto();

  const resetIntState = () => {
    setIsError(false);
    setError(null);
  };

  const destroy = async (albumId) => {
    resetIntState();
    setIsDeleting(true);

    try {
      const albumRef = doc(db, "albums", albumId);
      const albumDoc = await getDoc(albumRef);

      if (albumDoc.data().owner !== currentUser.uid) {
        setIsError(true);
        setError("Unable to delete, this album is not yours!");
        setIsDeleting(false);
        return;
      }

      // for each photo check if it belongs to other albums, if not delete from images collection and storage
      const promises = [];
      albumDoc.data().images.forEach((img) => {
        promises.push(deletePhoto.destroy(img));
        console.log("PromisesArr", promises);
      });
      console.log("After forEach, before promises.all");
      Promise.all(promises).then(async () => {
        console.log("In then for promise.all");
        // delete album doc when all photos are deleted from storage/db or not
        await deleteDoc(albumRef);
        setIsDeleting(false);
      });
    } catch (err) {
      setIsError(true);
      setError(err.message);
      setIsDeleting(false);
    }
  };
  return { isError, error, isDeleting, destroy };
};

export default useDeleteAlbum;
