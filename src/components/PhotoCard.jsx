import Card from "react-bootstrap/Card";

const PhotoCard = ({photo}) => {
  return (
    <Card >
      <Card.Img variant="top" src={photo.url} />
    </Card>
  )
};

export default PhotoCard;
