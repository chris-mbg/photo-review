import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import useModal from "../hooks/useModal";
import AddNewAlbumForm from "./AddNewAlbumForm";
import useCreateNewAlbum from "../hooks/useCreateNewAlbum";
import { useNavigate } from "react-router-dom";

const AddNewFromSelected = ({ preselectedPhotos }) => {
  const navigate = useNavigate();
  const { show, handleClose, handleShow } = useModal();
  const { error, loading, create } = useCreateNewAlbum();

  const handleNewFromSelectedSubmit = async (data) => {
    const docRef = await create(data.albumName, preselectedPhotos);

    navigate(`/album/${docRef.id}`);
  };

  return (
    <>
      <div className="mb-3 text-end">
        <Button
          variant="outline-info"
          size="sm"
          className=""
          onClick={handleShow}
        >
          <>
            <FontAwesomeIcon icon={faPlus} />
            <span className="ms-2">Make New Album with Selected Photos</span>
          </>
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Make a new album with the selected photos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error ? (
            <>{error}</>
          ) : (
            <AddNewAlbumForm
              submitFunc={handleNewFromSelectedSubmit}
              loading={loading}
              preselectedImages={preselectedPhotos}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddNewFromSelected;
