import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import useModal from "../hooks/useModal";
import useCreateNewAlbum from "../hooks/useCreateNewAlbum";
import AddNewAlbumForm from "./AddNewAlbumForm";
import ModalComponent from "./ModalComponent";
import ErrorAlert from "./ErrorAlert";

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

      <ModalComponent
        show={show}
        onHide={handleClose}
        title="Make a new album with the selected photos"
      >
        {error ? (
          <ErrorAlert errMsg={error} />
        ) : (
          <AddNewAlbumForm
            submitFunc={handleNewFromSelectedSubmit}
            loading={loading}
            preselectedImages={preselectedPhotos}
          />
        )}
      </ModalComponent>
    </>
  );
};

export default AddNewFromSelected;
