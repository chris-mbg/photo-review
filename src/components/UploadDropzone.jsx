import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import ProgressBar from "react-bootstrap/ProgressBar";
import Alert from "react-bootstrap/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImages,
  faFileUpload,
  faBan,
} from "@fortawesome/free-solid-svg-icons";
import useUploadPhotos from "../hooks/useUploadPhotos";
import ErrorAlert from "./ErrorAlert";

const UploadDropzone = ({ albumId }) => {
  const uploadPhotos = useUploadPhotos(albumId);

  const onDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles.length) {
      return;
    }

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
          <FontAwesomeIcon icon={faImages} />
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
          now={(uploadPhotos.uploadedBytes / uploadPhotos.uploadTotal) * 100}
        />
      )}

      {uploadPhotos.isError && <ErrorAlert errMsg={uploadPhotos.error} />}
      {uploadPhotos.isSuccess && <Alert variant="success">Uploaded!</Alert>}
    </div>
  );
};

export default UploadDropzone;
