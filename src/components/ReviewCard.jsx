import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faThumbsUp,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";

const ReviewCard = ({ photo, onYesClick, onNoClick, selected, deselected }) => {
  return (
    <Card border={selected ? "success" : deselected ? "danger" : "light"} className="border-3">
      <Card.Header className="text-end">
        <div className="d-flex justify-content-evenly">
          <Button
            size="sm"
            variant={selected ? "success" : "outline-success"}
            className={`${selected ? "text-white" : ""}`}
            onClick={() => onYesClick(photo)}
          >
            <FontAwesomeIcon icon={faThumbsUp} />
          </Button>
          <Button
            size="sm"
            variant={deselected ? "danger" : "outline-danger"}
            className=""
            onClick={() => onNoClick(photo)}
          >
            <FontAwesomeIcon icon={faThumbsDown} />
          </Button>
        </div>
      </Card.Header>
      <Card.Img variant="top" src={photo.url} />
    </Card>
  );
};

export default ReviewCard;
