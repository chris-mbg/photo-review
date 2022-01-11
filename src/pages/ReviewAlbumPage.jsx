import { useParams } from "react-router-dom";
import useCreateNewAlbum from "../hooks/useCreateNewAlbum";
import useModal from "../hooks/useModal";
import ReviewGrid from "../components/ReviewGrid";
import useReviewAlbum from "../hooks/useReviewAlbum";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import ErrorAlert from "../components/ErrorAlert";
import LoadingAlert from "../components/LoadingAlert";

const ReviewAlbumPage = () => {
  const { viewId } = useParams();
  const albumQuery = useReviewAlbum(viewId);
  const createAlbum = useCreateNewAlbum();
  const { show, handleShow, handleClose } = useModal();

  const handleReviewConfirm = async (selectedP) => {
    const newAlbumName =
      albumQuery.data[0].name +
      "_" +
      new Date().toLocaleString("sv-SV").slice(0, -3);

    await createAlbum.create(newAlbumName, selectedP, {
      review: true,
      reviewedAlbumId: albumQuery.data[0]._id,
      reviewedAlbumOwner: albumQuery.data[0].owner,
    });

    handleShow(true);
  };

  if (albumQuery.isError) {
    return <ErrorAlert errMsg={albumQuery.error}/>;
  }

  if (albumQuery.isLoading) {
    return <LoadingAlert />
  }

  return (
    <>
      {albumQuery.data && (
        <>
          <h1 className="logo-text text-center">Let's review!</h1>
          <p className="text-center">
            Choose which photos from {albumQuery.data[0].name} you want to keep.
          </p>

          <ReviewGrid
            photos={albumQuery.data[0].images}
            onReviewSend={handleReviewConfirm}
            loading={createAlbum.loading}
          />
        </>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">Review confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {createAlbum.error ? (
            <ErrorAlert errMsg={createAlbum.error} />
          ) : (
            <Alert variant="success">
              <p>
                Your review of the album {albumQuery.data[0].name} is now sent!
              </p>
            </Alert>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ReviewAlbumPage;
