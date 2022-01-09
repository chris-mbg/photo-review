import { serverTimestampConvert } from "../utils/serverTimestampConvert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import useModal from "../hooks/useModal";
import AddNewAlbumForm from "./AddNewAlbumForm";
import { useAuthContext } from "../contexts/AuthContext";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import useDeleteAlbum from "../hooks/useDeleteAlbum";

const AlbumInfo = ({ albumData }) => {
  const navigate = useNavigate()
  const { show, handleClose, handleShow } = useModal();
  const deleteAlbum = useDeleteAlbum(albumData._id)

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuthContext();

  const handleDeleteAlbum = async () => {
    console.log("delete me album")
    deleteAlbum.destroy()
    navigate("/")
  }

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
          <Link to={`/view/album/${albumData.viewId}`}>Review page</Link>
          <Button
            size="sm"
            variant="info"
            className="text-white"
            onClick={handleShow}
          >
            <FontAwesomeIcon icon={faPen} />
            <span className="ms-2">Change album name</span>
          </Button>
          {/* <Button
            size="sm"
            variant="outline-danger"
            className="mt-2"
            onClick={handleDeleteAlbum}
          >
            <FontAwesomeIcon icon={faTrash} />
            <span className="ms-2">Delete album</span>
          </Button> */}
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
      </Modal>
    </>
  );
};

export default AlbumInfo;
