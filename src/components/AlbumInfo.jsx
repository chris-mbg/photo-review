import { serverTimestampConvert } from "../utils/serverTimestampConvert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import useModal from "../hooks/useModal";
import AddNewAlbumForm from "./AddNewAlbumForm";
import { useAuthContext } from "../contexts/AuthContext";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const AlbumInfo = ({ albumData }) => {
  const { show, handleClose, handleShow } = useModal();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuthContext();

  const handleEditAlbumNameSubmit = async (data) => {
    setError(null);
    setLoading(true);

    if (albumData.owner !== currentUser.uid) {
      setError("Not your album to edit");
      return;
    }

    try {
      const albumRef = doc(db, "albums", albumData._id);
      await updateDoc(albumRef, {
        name: data.albumName,
      });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    } finally {
      // close modal
      handleClose();
    }
  };

  return (
    <>
      <div className="text-muted d-flex justify-content-end">
        <div className="border p-2 d-flex flex-column flex-nowrap rounded">
          <span>{albumData.images.length} photos</span>
          <span>Created: {serverTimestampConvert(albumData.createdAt)}</span>
          <span>Reviewed: {albumData.reviewed.length} times</span>
          <Button
            size="sm"
            variant="info"
            className="text-white"
            onClick={handleShow}
          >
            Change album name <FontAwesomeIcon icon={faPen} />
          </Button>
        </div>
      </div>

      <h1 className="text-center mb-3">{albumData.name}</h1>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change album name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddNewAlbumForm
            editMode={true}
            albumName={albumData.name}
            submitFunc={handleEditAlbumNameSubmit}
            loading={loading}
          />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button size="sm" variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button size="sm" variant="info" className="text-white" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default AlbumInfo;
