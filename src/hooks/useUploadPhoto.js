import { useState } from "react";
import { storage, db } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  collection,
  doc,
  addDoc,
  serverTimestamp,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { useAuthContext } from "../contexts/AuthContext";

const useUploadPhoto = (albumId) => {
  const { currentUser } = useAuthContext();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  const resetInternalState = () => {
    setError(null);
    setIsError(false);
    setIsSuccess(false);
    setUploadProgress(null);
  };

  const upload = async (photo) => {
    setIsUploading(true);
    resetInternalState();

    if (!photo instanceof File) {
      setIsError(true);
      setError("Not vaild");
      setIsUploading(false);
      return;
    }

    const stFilename = uuid() + "_" + photo.name;
    const stFullPath = "images/" + currentUser.uid + "/" + stFilename;

    try {
      // upload to storage
      const stRef = ref(storage, stFullPath);
      const uploadTask = uploadBytesResumable(stRef, photo);
      uploadTask.on("state_changed", (uploadSnapshot) => {
        setUploadProgress(
          Math.round(
            (uploadSnapshot.bytesTransferred /
              uploadSnapshot.totalBytes) *
              100
          )
        );
      });
      await uploadTask.then();
      const photoUrl = await getDownloadURL(stRef);

      // create firestore document
      const fsColRef = collection(db, "images");
      const fsImgRef = await addDoc(fsColRef, {
        name: photo.name,
        size: photo.size,
        type: photo.size,
        url: photoUrl,
        owner: currentUser.uid,
        path: stRef.fullPath,
        createdAt: serverTimestamp(),
      });

      //save photo to album
      const albumRef = doc(db, "albums", albumId);
      await updateDoc(albumRef, {
        images: arrayUnion({
          imgId: fsImgRef.id,
          url: photoUrl,
        }),
      })

      setUploadProgress(null)
      setIsSuccess(true)
      setIsUploading(false)

    } catch (err) {
      setIsError(true);
      setError(err.message);
      setIsSuccess(false);
      setIsUploading(false);
    }
  };

  return { isUploading, uploadProgress, isSuccess, isError, error, upload };
};

export default useUploadPhoto