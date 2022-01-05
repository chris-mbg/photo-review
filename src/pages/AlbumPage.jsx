import { useParams } from "react-router-dom";
import useAlbum from "../hooks/useAlbum";
import Alert from "react-bootstrap/Alert";
import { serverTimestampConvert } from "../utils/serverTimestampConvert";
import UploadDropzone from "../components/UploadDropzone";

const AlbumPage = () => {
  const { albumId } = useParams();
  const albumQuery = useAlbum(albumId);

  console.log("album data", albumQuery.data);

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

  return (
    <>

      {albumQuery.data && (
        <>
          <h1 className="text-center">{albumQuery.data.name}</h1>
          <div className="text-end text-muted">
            <p>{albumQuery.data.images.length} photos</p>
            <p>{serverTimestampConvert(albumQuery.data.createdAt)}</p>
            <p>Reviewed: {albumQuery.data.reviewed.length} times</p>
          </div>
        </>
      )}

      <hr />

      <UploadDropzone albumId={albumId} />


      <hr />
      <p>Show all photos in album</p>
      {albumQuery.data && albumQuery.data.images.map(p => <p>{p.url}</p>)}
    </>
  );
};

export default AlbumPage;
