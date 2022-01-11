import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const ReviewGridInfo = ({ onSendClick, total, yesPhotos, noPhotos }) => {
  return (
    <>
      <Row xs={2} className="text-center g-2 my-2 my-md-4">
          <Col>
            <span>
              <strong>Liked:</strong> {yesPhotos} of {total}
            </span>
          </Col>
          <Col>
            <span>
              <strong>Left to review:</strong>{" "}
              {total - (yesPhotos + noPhotos)}
            </span>
          </Col>
          <Col
            xs={{ span: 12 }}
            className={`${
              yesPhotos + noPhotos === total
                ? "visible"
                : "invisible"
            }`}
          >
            <Button
              variant="info"
              className="text-white"
              onClick={onSendClick}
              disabled={
                !(
                  total ===
                  yesPhotos + noPhotos
                )
              }
            >
              Confirm review
            </Button>
          </Col>
        </Row>
    </>
  );
}

export default ReviewGridInfo;