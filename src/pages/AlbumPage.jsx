import { useParams } from "react-router-dom";

const AlbumPage = () => {
  const { albumId } = useParams()

  return (
    <>
      <h1>Album details</h1>

      <hr />
      <p>Upload images</p>

      <hr />
      <p>Show all images in album</p>

    </>
  );
}

export default AlbumPage;