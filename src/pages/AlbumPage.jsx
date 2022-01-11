import { useParams } from "react-router-dom";
import useAlbum from "../hooks/useAlbum";
import Alert from "react-bootstrap/Alert";
import UploadDropzone from "../components/UploadDropzone";
import AlbumInfo from "../components/AlbumInfo";
import PhotoGrid from "../components/PhotoGrid";
import PhotoUpload from "../components/PhotoUpload";
import { useAuthContext } from "../contexts/AuthContext";
import ErrorAlert from "../components/ErrorAlert";
import LoadingAlert from "../components/LoadingAlert";

const AlbumPage = () => {
  const { albumId } = useParams();
  const albumQuery = useAlbum(albumId);
  const { currentUser } = useAuthContext();

  if (albumQuery.isError) {
    return <ErrorAlert errMsg={albumQuery.error} />;
  }
  if (albumQuery.isLoading) {
    return <LoadingAlert />;
  }

  if (albumQuery.data === undefined) {
    return (
      <Alert variant="light">
        <p>No data...</p>
      </Alert>
    );
  }

  if (albumQuery.data.owner !== currentUser.uid) {
    return (
      <ErrorAlert errMsg="This album does not belong to you..." />
    );
  }

  return (
    <>
      {albumQuery.data && <AlbumInfo albumData={albumQuery.data} />}

      {albumQuery.data && (
        <PhotoUpload numOfPhotos={albumQuery.data.images.length}>
          <UploadDropzone albumId={albumId} />
        </PhotoUpload>
      )}

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
