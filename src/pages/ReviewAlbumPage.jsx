import { useParams } from "react-router-dom";
import useReviewAlbum from "../hooks/useReviewAlbum";
import Alert from "react-bootstrap/Alert";
import ReviewGrid from "../components/ReviewGrid";

const ReviewAlbumPage = () => {
  const { viewId } = useParams()
  const albumQuery = useReviewAlbum(viewId)

  console.log(albumQuery.data)

  const handleReviewConfirm = (selectedP) => {
    console.log("review done!")
  }

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
          <h1>Let's review!</h1>
          <p>Choose which photos from {albumQuery.data[0].name} you like best!</p>
          <ReviewGrid photos={albumQuery.data[0].images} onReviewSend={handleReviewConfirm}/>
        </>
      )}

    </>
  );
}

export default ReviewAlbumPage;