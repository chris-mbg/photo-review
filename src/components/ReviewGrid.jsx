import ReviewCard from "./ReviewCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { SRLWrapper } from "simple-react-lightbox";
import { useState } from "react";

const ReviewGrid = ({ photos, onReviewSend, loading }) => {
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [discardedPhotos, setDiscardedPhotos] = useState([]);

  const handleYesClick = (photo) => {
    if (discardedPhotos.find((obj) => obj.imgId === photo.imgId)) {
      setDiscardedPhotos(
        discardedPhotos.filter((obj) => obj.imgId !== photo.imgId)
      );
    }
    if (selectedPhotos.find((obj) => obj.imgId === photo.imgId)) {
      setSelectedPhotos(
        selectedPhotos.filter((obj) => obj.imgId !== photo.imgId)
      );
    } else {
      setSelectedPhotos([...selectedPhotos, photo]);
    }
  };

  const handleNoClick = (photo) => {
    if (selectedPhotos.find((obj) => obj.imgId === photo.imgId)) {
      setSelectedPhotos(
        selectedPhotos.filter((obj) => obj.imgId !== photo.imgId)
      );
    }
    if (discardedPhotos.find((obj) => obj.imgId === photo.imgId)) {
      setDiscardedPhotos(
        discardedPhotos.filter((obj) => obj.imgId !== photo.imgId)
      );
    } else {
      setDiscardedPhotos([...discardedPhotos, photo]);
    }
  };

  const handleSendClick = () => {
    if (photos.length === selectedPhotos.length + discardedPhotos.length) {
      onReviewSend(selectedPhotos);
    } else {
      return;
    }
  };

  return (
    <>
      {photos && (
        <div>
          <p>Info</p>
          <p>
            Liked: {selectedPhotos.length} of {photos.length}
          </p>
          <p>
            Left to review:{" "}
            {photos.length - (selectedPhotos.length + discardedPhotos.length)}
          </p>

          <Button
            variant="info"
            onClick={handleSendClick}
            disabled={
              !(photos.length === selectedPhotos.length + discardedPhotos.length) || loading
            }
          >
            Confirm review
          </Button>
        </div>
      )}
      {photos && (
        <SRLWrapper>
          <Row xs={2} md={3} xl={4} xxl={5} className="g-4">
            {photos.map((p) => (
              <Col key={p.imgId}>
                <ReviewCard
                  photo={p}
                  onYesClick={handleYesClick}
                  onNoClick={handleNoClick}
                  selected={selectedPhotos.find((obj) => obj.imgId === p.imgId)}
                  deselected={discardedPhotos.find(
                    (obj) => obj.imgId === p.imgId
                  )}
                />
              </Col>
            ))}
          </Row>
        </SRLWrapper>
      )}
    </>
  );
};

export default ReviewGrid;
