import PhotoCard from "./PhotoCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SRLWrapper } from "simple-react-lightbox";

const PhotoGrid = ({ photos }) => {
  return (
    <>
      {photos && (
        <SRLWrapper>
          <Row xs={2} md={3} xl={4} className="g-4">
            {photos.map((p) => (
              <Col key={p.imgId}>
                <PhotoCard photo={p}  />
              </Col>
            ))}
          </Row>
        </SRLWrapper>
      )}
    </>
  );
};

export default PhotoGrid;
