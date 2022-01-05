import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const PhotoCard = ({ photo, selected, onButtonClick }) => {
  return (
    <Card>
      <Card.Header className="text-end">
        <Button size="sm" variant={selected ? "info" : "outline-info"} className={`${selected ? "text-white" : ""}`} onClick={() => onButtonClick(photo)}>
          <FontAwesomeIcon icon={faCheck} />
        </Button>
      </Card.Header>
      <Card.Img variant="top" src={photo.url} />
    </Card>
  );
};

export default PhotoCard;
