import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import AddNewAlbumForm from "./AddNewAlbumForm";
import ErrorAlert from "./ErrorAlert";
import Button from "react-bootstrap/Button";
import { v4 as uuid } from "uuid";

const AddNewAlbum = () => {
  const preselectedImages = null;

  const [showAlbumForm, setShowAlbumForm] = useState(false);

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuthContext();

  const handleAddNewSubmit = async (data) => {
    setError(null);

    try {
      setLoading(true);

      const docRef = await addDoc(collection(db, "albums"), {
        name: data.albumName,
        images: preselectedImages ? preselectedImages : [],
        viewId: uuid(),
        owner: currentUser.uid,
        createdAt: serverTimestamp(),
        reviewed: [],
      });

      setLoading(false);
      navigate(`/album/${docRef.id}`);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-end">
        <Button
          variant="info"
          className="text-white"
          onClick={() => setShowAlbumForm(!showAlbumForm)}
          disabled={loading}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span className="ms-2">Add New Album</span>
        </Button>
      </div>
      {error && <ErrorAlert errMsg={error} />}
      {showAlbumForm && (
        <AddNewAlbumForm loading={loading} submitFunc={handleAddNewSubmit} />
      )}
    </>
  );
};

export default AddNewAlbum;
