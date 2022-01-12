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

const useUploadPhotos = (albumId) => {
  const { currentUser } = useAuthContext();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadTotal, setUploadTotal] = useState(null);
  const [uploadedBytes, setUploadedBytes] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  const resetInternalState = () => {
    setError(null);
    setIsError(false);
    setIsSuccess(false);
    setUploadedBytes(null);
    setUploadTotal(null);
  };

  const uploadOne = async (photo) => {
    return new Promise((resolve, reject) => {
      const stFilename = uuid() + "_" + photo.name;
      const stFullPath = "images/" + currentUser.uid + "/" + stFilename;

      // upload to storage
      const stRef = ref(storage, stFullPath);
      const uploadTask = uploadBytesResumable(stRef, photo);

      uploadTask.on(
        "state_changed",
        (uploadSnapshot) => {
          setUploadedBytes(
            (prevState) => prevState + uploadSnapshot.bytesTransferred
          );
        },
        (err) => {
          reject(err);
        },
        async () => {
          try {
            const photoUrl = await getDownloadURL(stRef);
            // create firestore document
            const fsColRef = collection(db, "images");
            const fsImgRef = await addDoc(fsColRef, {
              name: photo.name,
              size: photo.size,
              type: photo.type,
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
            });
            resolve();
          } catch (err) {
            reject(err)
          }
        }
      );
    });
  };

  const uploadAll = async (photosArr) => {
    setIsUploading(true);
    resetInternalState();

    setUploadTotal(photosArr.reduce((acc, curr) => acc + curr.size, 0));

    photosArr.forEach((photo) => {
      if (!photo instanceof File) {
        setIsError(true);
        setError("Not vaild");
        setIsUploading(false);
        return;
      }
    });

    const promises = [];
    photosArr.forEach((photo) => {
      promises.push(uploadOne(photo));
    });

    Promise.all(promises).then(() => {
      setUploadTotal(null);
      setUploadedBytes(null);
      setIsSuccess(true);
      setIsUploading(false);
    }).catch(err => {
      setIsError(true);
      setError(err.message);
      setIsSuccess(false);
      setIsUploading(false)
    }) ;
  };

  return {
    isUploading,
    uploadTotal,
    uploadedBytes,
    isSuccess,
    isError,
    error,
    uploadAll,
  };
};

export default useUploadPhotos;
