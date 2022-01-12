import useAlbums from "../hooks/useAlbums";
import ListGroup from "react-bootstrap/ListGroup";
import { serverTimestampConvert } from "../utils/serverTimestampConvert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import InfoAlert from "./InfoAlert";

const AlbumOverview = () => {
  const albumsQuery = useAlbums();
  const navigate = useNavigate();

  return (
    <>
      <h2 className="text-center logo-text">Album overview</h2>

      {albumsQuery.data && (
        <ListGroup variant="flush" className="mt-3">
          {albumsQuery.data.length ? (
            <>
              <ListGroup.Item variant="light">
                <Row className="text-muted fw-light text-uppercase extra-small-text">
                  <Col xs={5} md={5} lg={6}>Name</Col>
                  <Col className="text-center">Photos</Col>
                  <Col>Created</Col>
                </Row>
              </ListGroup.Item>
              {albumsQuery.data.map((a, i) => (
                <ListGroup.Item
                  action
                  key={a._id}
                  variant={i % 2 === 0 ? "info" : "light"}
                  className="p-3"
                  onClick={() => navigate(`/album/${a._id}`)}
                >
                  <Row>
                    <Col xs={5} md={5} lg={6} className="fw-bold">{a.name}</Col>
                    <Col className="text-center">{a.images.length}</Col>
                    <Col>{serverTimestampConvert(a.createdAt)}</Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </>
          ) : (
            <InfoAlert msg="No albums yet... Add one!" />
          )}
        </ListGroup>
      )}
    </>
  );
};

export default AlbumOverview;
