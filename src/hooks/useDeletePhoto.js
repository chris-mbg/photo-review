import { useState } from "react";
import { storage, db } from "../firebase";
import { ref, deleteObject } from "firebase/storage";
import { doc, deleteDoc, query, where, collection, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { useAuthContext } from "../contexts/AuthContext";

const useDeletePhoto = () => {
  const { currentUser } = useAuthContext()
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const resetIntState = () => {
    setIsError(false)
    setError(null)
  }

  const destroy = async (photo, albumId = null) => {
    resetIntState()
    setIsDeleting(true)

    try {
      // check owner of photo --> match current user
      const imgDocRef = doc(db, "images", photo.imgId)
      const imgDoc = await getDoc(imgDocRef)
      if(imgDoc.data().owner !== currentUser.uid) {
        setIsError(true)
        setError("Unable to delete, this photo is not yours!")
        setIsDeleting(false)
        return
      }
      //check if image belongs to other albums
      const albumsColRef = collection(db, "albums")
      const albumsQueryRef = query(albumsColRef, where("images", "array-contains", photo))
      const albumsQuerySnap = await getDocs(albumsQueryRef)
      console.log("Querysnap: ", albumsQuerySnap.docs)

      // If no albumId the destroy process "belongs" to a deleteAlbum process and not neccessary to filter out anything from the album.
      if(albumId) {
        console.log("albumId is not null...")

        // delete from current album (if deleting only photo and not entire album)
        const albumRef = doc(db, "albums",albumId)
        const albumDoc = await getDoc(albumRef)
        console.log(albumDoc.data())
        const newImagesArr = albumDoc.data().images.filter(p => p.imgId !== photo.imgId)
        await updateDoc(albumRef, { images: newImagesArr })
      }

      if(albumsQuerySnap.docs.length === 1) {
        console.log("deleting from storage and images also...")
        // image belongs to just this album and both imgDoc and storage object will be deleted
        console.log("storage path", imgDoc.data().path )
        const storageRef = ref(storage, imgDoc.data().path)
        await deleteObject(storageRef)

        await deleteDoc(imgDocRef)
      }

      setIsDeleting(false)

    } catch (err) {
      setIsError(true)
      setError(err.message)
      setIsDeleting(false)
    }
  }


  return { isError, error, isDeleting, destroy }
}

export default useDeletePhoto


/*
import React, { useState } from "react";
import { storage, db } from "../firebase";
import { ref, deleteObject } from "firebase/storage";
import { doc, deleteDoc } from "firebase/firestore";

// the Firestore doc as arg
const useDeleteImage = (image) => {

  const [isError, setIsError] = useState(false)
  const [error, setError] = useState(null)
  const [isMutating, setIsMutating] = useState(false)

  const mutate = async () => {
    setIsError(false)
    setError(null)
    setIsMutating(true)

    // run mutation that will delete image from storage and db
    try {
      const storageRef = ref(storage, image.path)
      await deleteObject(storageRef)

      const docRef = doc(db, "images", image._id)
      await deleteDoc(docRef)

    } catch(err) {

      setIsError(true)
      setError(err)
      setIsMutating(false)

    }

  }

  return { error, isError, isMutating, mutate }
}

export default useDeleteImage;



*/