import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const ReviewGridInfo = ({ onSendClick, total, yesPhotos, noPhotos }) => {
  return (
    <>
      <Row xs={1} sm={2} className="text-center g-2 my-2 my-md-4">
        <Col>
          <span className="h5">
            <strong>Liked:</strong> {yesPhotos} of {total}
          </span>
        </Col>
        <Col>
          <span className="h5">
            <strong>Left to review:</strong> {total - (yesPhotos + noPhotos)}
          </span>
        </Col>
        <Col xs={{ span: 12 }} sm={{ span: 12 }}>
          <Button
            variant="info"
            className="text-white"
            onClick={onSendClick}
            disabled={!(total === yesPhotos + noPhotos)}
          >
            Confirm review
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default ReviewGridInfo;
