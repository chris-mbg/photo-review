import { useNavigate, useParams } from "react-router-dom";
import useAlbum from "../hooks/useAlbum";
import Alert from "react-bootstrap/Alert";
import UploadDropzone from "../components/UploadDropzone";
import AlbumInfo from "../components/AlbumInfo";
import PhotoGrid from "../components/PhotoGrid";
import PhotoUpload from "../components/PhotoUpload";
import { useAuthContext } from "../contexts/AuthContext";

const AlbumPage = () => {
  const { albumId } = useParams();
  const albumQuery = useAlbum(albumId);
  const { currentUser } = useAuthContext();
  const navigate = useNavigate()

  console.log("album data", albumQuery);


  if (albumQuery.isError) {
    return (
      <Alert variant="danger">
        <p>
          <strong>Error!</strong>
        </p>
        {albumQuery.error}
      </Alert>
    );
  }
  if (albumQuery.isLoading) {
    return (
      <Alert variant="warning">
        <p>
          <strong>Loading...</strong>
        </p>
      </Alert>
    );
  }

  if(albumQuery.data === undefined) {
    return (
      <Alert variant="light">
        <p>
          No data...
        </p>
      </Alert>
    )
    // when deleting album
    //navigate("/")
  }

  if (albumQuery.data.owner !== currentUser.uid) {
    return (
      <Alert variant="danger">
        <p>
          <strong>Error!</strong>
        </p>
        This album does not belong to you...
      </Alert>
    );
  }

  return (
    <>
      {albumQuery.data && <AlbumInfo albumData={albumQuery.data} />}

      <PhotoUpload>
        <UploadDropzone albumId={albumId} />
      </PhotoUpload>

      {albumQuery.data && !albumQuery.data.images.length && (
        <Alert variant="info" className="text-center">
          No photos in this album, add some!
        </Alert>
      )}
      {albumQuery.data && albumQuery.data.images.length > 0 && (
        <PhotoGrid photos={albumQuery.data.images} albumId={albumId} />
      )}
    </>
  );
};

export default AlbumPage;
