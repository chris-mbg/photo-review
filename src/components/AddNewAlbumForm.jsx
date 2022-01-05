import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useAuthContext } from "../contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp, doc } from "firebase/firestore";
import { v4 as uuid } from "uuid";

const AddNewAlbumForm = ({ preselectedImages }) => {
  // image array as prop if images from another album is selected

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuthContext();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    setError(null);

    try {
      setLoading(true);

      const docRef = await addDoc(collection(db, "albums"), {
        name: data.albumName,
        images: preselectedImages ? preselectedImages :  [],
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
      <Form className="w-50 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <Alert variant="danger">
            <strong>Error!</strong>
            <p>{error}</p>
          </Alert>
        )}
        <Form.Group className="mb-3" controlId="albumInput1">
          <Form.Label>Album name</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            required
            {...register("albumName", { required: true })}
          />
        </Form.Group>

        <Button
          type="submit"
          variant="info"
          className="text-white my-3"
          disabled={loading}
        >
          Create Album
        </Button>

        {preselectedImages && (
          <p>
            The album will contain your {preselectedImages.length} selected
            photos
          </p>
        )}
      </Form>
    </>
  );
};

export default AddNewAlbumForm;
