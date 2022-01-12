import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import useDeletePhoto from "../hooks/useDeletePhoto";

const PhotoCard = ({ photo, albumId, selected, onButtonClick }) => {
  const { destroy, isError, error, isDeleting } = useDeletePhoto();

  const handlePhotoDeleteClick = async () => await destroy(photo, albumId)

  return (
    <Card>
      <Card.Header>
        {isError ? (
          <small className="text-danger">Error: {error}</small>
        ) : isDeleting ? (
          <small className="text-secondary">Deleting photo...</small>
        ) : (
          <div className="d-flex justify-content-between">
            <Button
              size="sm"
              variant="outline-danger"
              onClick={handlePhotoDeleteClick}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
            <Button
              size="sm"
              variant={selected ? "info" : "outline-info"}
              className={`${selected ? "text-white" : ""}`}
              onClick={() => onButtonClick(photo)}
            >
              <FontAwesomeIcon icon={faCheck} />
            </Button>
          </div>
        )}
      </Card.Header>
      <Card.Img variant="top" src={photo.url} />
    </Card>
  );
};

export default PhotoCard;
