import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import AddNewAlbumForm from "./AddNewAlbumForm";

const AddNewAlbum = () => {
  const [showAlbumForm, setShowAlbumForm] = useState(false);

  return (
    <>
      <div className="text-end">
        <Button
          variant="info"
          className="text-white"
          onClick={() => setShowAlbumForm(!showAlbumForm)}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span className="ms-2">Add New Album</span>
        </Button>
      </div>
      {showAlbumForm && <AddNewAlbumForm />}
    </>
  );
};

export default AddNewAlbum;
