import PhotoCard from "./PhotoCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SRLWrapper } from "simple-react-lightbox";
import { useState, useEffect } from "react";
import AddNewFromSelected from "./AddNewFromSelected";

const PhotoGrid = ({ photos }) => {
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  const handleSelectClick = (photo) => {
    console.log("select click", photo);
    if (selectedPhotos.find((obj) => obj.imgId === photo.imgId)) {
      setSelectedPhotos(
        selectedPhotos.filter((obj) => obj.imgId !== photo.imgId)
      );
    } else {
      setSelectedPhotos([...selectedPhotos, photo]);
    }
  };

  useEffect(() => {
    console.log(selectedPhotos);
  }, [selectedPhotos]);

  return (
    <>
      <div className={`${selectedPhotos.length > 0 ? "visible" : "invisible"}`}>
        <AddNewFromSelected preselectedPhotos={selectedPhotos} />
      </div>

      {photos && (
        <SRLWrapper>
          <Row xs={2} md={3} xl={4} className="g-4">
            {photos.map((p) => (
              <Col key={p.imgId}>
                <PhotoCard
                  photo={p}
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
