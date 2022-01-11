import { serverTimestampConvert } from "../utils/serverTimestampConvert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faCopy } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import useModal from "../hooks/useModal";
import AddNewAlbumForm from "./AddNewAlbumForm";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import useDeleteAlbum from "../hooks/useDeleteAlbum";
import useEditAlbumName from "../hooks/useEditAlbumName";

const AlbumInfo = ({ albumData }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();
  const { show, handleClose, handleShow } = useModal();
  const editAlbumName = useEditAlbumName();
  const deleteAlbum = useDeleteAlbum();

  const handleDeleteAlbum = async () => {
    console.log("delete me album");
    await deleteAlbum.destroy(albumData._id);
    navigate("/");
  };

  const handleEditAlbumNameSubmit = async (data) => {
    console.log("Edit name: ", data.albumName);
    await editAlbumName.edit(albumData._id, data.albumName);
    handleClose();
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(
      `${
        process.env.NODE_ENV === "production"
          ? "http://photo-review.netlify.app"
          : "http://localhost:3000"
      }/view/album/${albumData.viewId}`
    );
  };

  if (albumData.owner !== currentUser.uid) {
    return <p>This album does not belong to you</p>;
  }

  return (
    <>
      <div className="text-muted d-flex justify-content-end">
        <div className="border p-2 d-flex flex-column flex-nowrap rounded">
          <span>{albumData.images.length} photos</span>
          <span>Created: {serverTimestampConvert(albumData.createdAt)}</span>
          <span>Reviewed: {albumData.reviewed.length} times</span>
          <span className="">
            <Link to={`/view/album/${albumData.viewId}`}>Review page</Link>
            <span className="ms-3 cursor-pointer" onClick={handleCopyLink}>
              <FontAwesomeIcon icon={faCopy} title="Copy link!"/>
            </span>
          </span>
          <Button
            size="sm"
            variant="info"
            className="text-white"
            onClick={handleShow}
            disabled={deleteAlbum.isDeleting || editAlbumName.isEditing}
          >
            <FontAwesomeIcon icon={faPen} />
            <span className="ms-2">Change album name</span>
          </Button>
          <Button
            size="sm"
            variant="outline-danger"
            className="mt-2"
            onClick={handleDeleteAlbum}
            disabled={deleteAlbum.isDeleting || editAlbumName.isEditing}
          >
            <FontAwesomeIcon icon={faTrash} />
            <span className="ms-2">Delete album</span>
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
            loading={editAlbumName.isEditing}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AlbumInfo;
