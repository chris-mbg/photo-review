import useAlbums from "../hooks/useAlbums";
import ListGroup from "react-bootstrap/ListGroup";
import { serverTimestampConvert } from "../utils/serverTimestampConvert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

const AlbumOverview = () => {
  const albumsQuery = useAlbums();
  const navigate = useNavigate()

  return (
    <>
      <h2 className="text-center">Album overview</h2>

      {albumsQuery.data && (
        <ListGroup variant="flush" className="mt-3">
          {albumsQuery.data.length ? (
            <>
            <ListGroup.Item
                variant="light"
              >
                <Row className="text-black fw-light">
                  <Col>Name</Col>
                  <Col className="text-center">Number of photos</Col>
                  <Col>Created at</Col>
                </Row>
              </ListGroup.Item>
            {albumsQuery.data.map((a, i) => (
              <ListGroup.Item
                action
                key={a._id}
                variant={i % 2 === 0 ? "info" : "light"}
                className="p-3"
                onClick={() => navigate(`/album/${a._id}`) }
              >
                <Row>
                  <Col className="fw-bold">{a.name}</Col>
                  <Col className="text-center">{a.images.length}</Col>
                  <Col>{serverTimestampConvert(a.createdAt)}</Col>
                </Row>
              </ListGroup.Item>
            ))}
            </>
          ) : (
            <p>No albums yet... Add one!</p>
          )}
        </ListGroup>
      )}
    </>
  );
};

export default AlbumOverview;
