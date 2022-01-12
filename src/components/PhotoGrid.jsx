import { useState } from "react";
import PhotoCard from "./PhotoCard";
import AddNewFromSelected from "./AddNewFromSelected";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SRLWrapper } from "simple-react-lightbox";

const PhotoGrid = ({ photos, albumId }) => {
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  const handleSelectClick = (photo) => {
    if (selectedPhotos.find((obj) => obj.imgId === photo.imgId)) {
      setSelectedPhotos(
        selectedPhotos.filter((obj) => obj.imgId !== photo.imgId)
      );
    } else {
      setSelectedPhotos([...selectedPhotos, photo]);
    }
  };

  return (
    <>
      <div className={`${selectedPhotos.length > 0 ? "visible" : "invisible"}`}>
        <AddNewFromSelected preselectedPhotos={selectedPhotos} />
      </div>

      {photos && (
        <SRLWrapper>
          <Row xs={2} md={3} xl={4} xxl={5} className="g-4">
            {photos.map((p) => (
              <Col key={p.imgId}>
                <PhotoCard
                  photo={p}
                  albumId={albumId}
                  onButtonClick={handleSelectClick}
                  selected={selectedPhotos.find((obj) => obj.imgId === p.imgId)}
                />
              </Col>
            ))}
          </Row>
        </SRLWrapper>
      )}
    </>
  );
};

export default PhotoGrid;
