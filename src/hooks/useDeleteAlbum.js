import { useState } from "react";
import { storage, db } from "../firebase";
import { ref, deleteObject } from "firebase/storage";
import { doc, deleteDoc, query, where, collection, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { useAuthContext } from "../contexts/AuthContext";
import useDeletePhoto from "./useDeletePhoto";

const useDeleteAlbum = () => {
  const { currentUser } = useAuthContext()
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const deletePhoto = useDeletePhoto()

  const resetIntState = () => {
    setIsError(false)
    setError(null)
  }

  const destroy = async (albumId) => {
    resetIntState()
    setIsDeleting(true)

    try {
      const albumRef = doc(db, "albums", albumId)
      const albumDoc = await getDoc(albumRef)

      if(albumDoc.data().owner !== currentUser.uid) {
        setIsError(true)
        setError("Unable to delete, this album is not yours!")
        setIsDeleting(false)
        return
      }

      // for each photo check if it belongs to other albums, if not delete from images collection and storage
      albumDoc.data().images.forEach(async img => {
        await deletePhoto.destroy(img)
      })

      // delete album doc
      await deleteDoc(albumRef)

    } catch(err) {
      setIsError(true)
      setError(err.message)
      setIsDeleting(false)
    }

  }
  return { isError, error, isDeleting, destroy }
}

export default useDeleteAlbum