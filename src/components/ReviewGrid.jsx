import { useState } from "react";
import ReviewCard from "./ReviewCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SRLWrapper } from "simple-react-lightbox";
import ReviewGridInfo from "./ReviewGridInfo";

const ReviewGrid = ({ photos, onReviewSend, loading }) => {
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [discardedPhotos, setDiscardedPhotos] = useState([]);

  const existInPhotoArray = (photo, arrToCheck) => {
    return arrToCheck.find((obj) => obj.imgId === photo.imgId);
  };

  const handleYesClick = (photo) => {
    if (existInPhotoArray(photo, discardedPhotos)) {
      setDiscardedPhotos(
        discardedPhotos.filter((obj) => obj.imgId !== photo.imgId)
      );
    }
    if (existInPhotoArray(photo, selectedPhotos)) {
      setSelectedPhotos(
        selectedPhotos.filter((obj) => obj.imgId !== photo.imgId)
      );
    } else {
      setSelectedPhotos([...selectedPhotos, photo]);
    }
  };

  const handleNoClick = (photo) => {
    if (existInPhotoArray(photo, selectedPhotos)) {
      setSelectedPhotos(
        selectedPhotos.filter((obj) => obj.imgId !== photo.imgId)
      );
    }
    if (existInPhotoArray(photo, discardedPhotos)) {
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
        <>
          <ReviewGridInfo onSendClick={handleSendClick} total={photos.length} yesPhotos={selectedPhotos.length} noPhotos={discardedPhotos.length} />

          <SRLWrapper>
            <Row xs={2} md={3} xl={4} xxl={5} className="g-4">
              {photos.map((p) => (
                <Col key={p.imgId}>
                  <ReviewCard
                    photo={p}
                    onYesClick={handleYesClick}
                    onNoClick={handleNoClick}
                    selected={selectedPhotos.find(
                      (obj) => obj.imgId === p.imgId
                    )}
                    deselected={discardedPhotos.find(
                      (obj) => obj.imgId === p.imgId
                    )}
                  />
                </Col>
              ))}
            </Row>
          </SRLWrapper>
        </>
      )}
    </>
  );
};

export default ReviewGrid;
