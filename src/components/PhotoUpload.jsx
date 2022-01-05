import { useState } from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const PhotoUpload = ({ children }) => {
  const [showDropzone, setShowDropzone] = useState(true);

  return (
    <>
      <div className="text-end">
        <Button
          variant="info"
          className="text-white"
          onClick={() => setShowDropzone(!showDropzone)}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span className="ms-2">Upload Photo</span>
        </Button>
      </div>
      {showDropzone && children}
    </>
  );
};

export default PhotoUpload;
