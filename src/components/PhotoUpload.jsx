import { useState } from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const PhotoUpload = ({ children }) => {
  const [showDropzone, setShowDropzone] = useState(true);

  return (
    <div className="mb-4">
      <div className="text-end">
        <Button
          variant="info"
          className="text-white"
          onClick={() => setShowDropzone(!showDropzone)}
        >
          {showDropzone ? (
            <>
              <FontAwesomeIcon icon={faTimes} />
              <span className="ms-2">Close Upload</span>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faPlus} />
              <span className="ms-2">Add New Photos</span>
            </>
          )}
        </Button>
      </div>
      <div className={`${showDropzone ? "" : "d-none"}`}>
        {children}
      </div>
    </div>
  );
};

export default PhotoUpload;
