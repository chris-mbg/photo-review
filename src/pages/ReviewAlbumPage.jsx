import { useParams } from "react-router-dom";
import useCreateNewAlbum from "../hooks/useCreateNewAlbum";
import useModal from "../hooks/useModal";
import ReviewGrid from "../components/ReviewGrid";
import useReviewAlbum from "../hooks/useReviewAlbum";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";

const ReviewAlbumPage = () => {
  const { viewId } = useParams();
  const albumQuery = useReviewAlbum(viewId);
  const createAlbum = useCreateNewAlbum();
  const { show, handleShow, handleClose } = useModal();

  console.log(albumQuery.data);

  const handleReviewConfirm = async (selectedP) => {
    const newAlbumName =
      albumQuery.data[0].name +
      "_" +
      new Date().toLocaleString("sv-SV").slice(0, -3);
    console.log(newAlbumName);

    await createAlbum.create(newAlbumName, selectedP, {
      review: true,
      reviewedAlbumId: albumQuery.data[0]._id,
      reviewedAlbumOwner: albumQuery.data[0].owner,
    });

    handleShow(true);
  };

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
            <Alert variant="danger">
              <p>
                <strong>Error!</strong>
              </p>
              {createAlbum.error}
            </Alert>
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
