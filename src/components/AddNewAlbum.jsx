import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddNewAlbumForm from "./AddNewAlbumForm";
import { useAuthContext } from "../contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp, doc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import Alert from "react-bootstrap/Alert";

const AddNewAlbum = () => {
  const preselectedImages = null

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

      console.log("doc ref", docRef);
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
      {error && (
        <Alert variant="danger">
          <strong>Error!</strong>
          <p>{error}</p>
        </Alert>
      )}
      {showAlbumForm && (
        <AddNewAlbumForm loading={loading} submitFunc={handleAddNewSubmit} />
      )}
    </>
  );
};

export default AddNewAlbum;
