import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import ProgressBar from "react-bootstrap/ProgressBar";
import Alert from "react-bootstrap/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faFileUpload,
  faBan,
} from "@fortawesome/free-solid-svg-icons";
//import useUploadPhoto from "../hooks/useUploadPhoto";
import useUploadPhotos from "../hooks/useUploadPhotos";
import ProgressBar from "react-bootstrap/ProgressBar";
import Alert from "react-bootstrap/Alert";

const UploadDropzone = ({ albumId }) => {
  const uploadPhotos = useUploadPhotos(albumId);

  const onDrop = useCallback((acceptedFiles) => {
    console.log("Got files", acceptedFiles);

    if (!acceptedFiles.length) {
      return;
    }

    //uploadPhoto.upload(acceptedFiles[0])
    uploadPhotos.uploadAll(acceptedFiles);
  }, []);

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/gif, image/jpeg, image/png, image/webp",
    onDrop,
    // maxFiles: 4,
  });

  return (
    <div
      {...getRootProps()}
      id="dropzone"
      className={`${isDragAccept ? "accept" : isDragReject ? "reject" : ""}`}
    >
      <input {...getInputProps()} />

      {isDragActive ? (
        isDragAccept ? (
          <p className="fs-2">
            <FontAwesomeIcon icon={faFileUpload} />
          </p>
        ) : (
          <p className="fs-2">
            <FontAwesomeIcon icon={faBan} />
          </p>
        )
      ) : (
        <p className="fs-2">
          <FontAwesomeIcon icon={faImage} />
        </p>
      )}

      {acceptedFiles.length > 0 && (
        <div className="accepted-files mt-2">
          <ul className="list-unstyled">
            {acceptedFiles.map((file) => (
              <li key={file.name}>
                {file.name} ({Math.round(file.size / 1024)} kb)
              </li>
            ))}
          </ul>
        </div>
      )}

      {uploadPhotos.uploadedBytes !== null && (
        <ProgressBar
          variant="info"
          striped
          animated
          now={uploadPhotos.uploadedBytes/uploadPhotos.uploadTotal * 100}
        />
      )}

      {uploadPhotos.isError && (
        <Alert variant="warning">{uploadPhotos.error}</Alert>
      )}
      {uploadPhotos.isSuccess && <Alert variant="success">Uploaded!</Alert>}
    </div>
  );
};

export default UploadDropzone;
