import { serverTimestampConvert } from "../utils/serverTimestampConvert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faCopy } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import useModal from "../hooks/useModal";
import AddNewAlbumForm from "./AddNewAlbumForm";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import useDeleteAlbum from "../hooks/useDeleteAlbum";
import useEditAlbumName from "../hooks/useEditAlbumName";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AlbumInfo = ({ albumData }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();
  const { show, handleClose, handleShow } = useModal();
  const editAlbumName = useEditAlbumName();
  const deleteAlbum = useDeleteAlbum();

  const handleDeleteAlbum = async () => {
    console.log("delete me album");
    await deleteAlbum.destroy(albumData._id);
    navigate("/");
  };

  const handleEditAlbumNameSubmit = async (data) => {
    console.log("Edit name: ", data.albumName);
    await editAlbumName.edit(albumData._id, data.albumName);
    handleClose();
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(
      `${
        process.env.NODE_ENV === "production"
          ? "http://photo-review.netlify.app"
          : "http://localhost:3000"
      }/view/album/${albumData.viewId}`
    );
  };

  if (albumData.owner !== currentUser.uid) {
    return <p>This album does not belong to you</p>;
  }

  return (
    <div className="d-flex flex-column flex-nowrap">
      <h1 className="logo-text text-center mb-3 order-lg-2 mt-lg-3">
        {albumData.name}
      </h1>
      <Col xs={12} lg={{ span: 4, offset: 8 }}>
        <Row xs={1} sm={2} lg={2} className="text-muted border rounded g-2 p-1">
          <Col>
            <Col>
              <small>{albumData.images.length} {albumData.images.length === 1 ? "photo" : "photos" }</small>
            </Col>
            <Col>
              <small>
                Created: {serverTimestampConvert(albumData.createdAt)}
              </small>
            </Col>
          </Col>
          <Col>
            <Col>
              <small>Reviewed: {albumData.reviewed.length} times</small>
            </Col>
            <Col>
              <small>
                <Link to={`/view/album/${albumData.viewId}`}>Review page</Link>
                <span className="ms-3 cursor-pointer" onClick={handleCopyLink}>
                  <FontAwesomeIcon icon={faCopy} title="Copy link!" />
                </span>
              </small>
            </Col>
          </Col>
          <Col
            xs={{ span: 12 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
            xl={{ span: 12 }}
            xxl={{ span: 12 }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <Button
                size="sm"
                variant="outline-info"
                className=""
                onClick={handleShow}
                disabled={deleteAlbum.isDeleting || editAlbumName.isEditing}
              >
                <FontAwesomeIcon icon={faPen} />
                <span className="ms-2">Change album name</span>
              </Button>
              <Button
                size="sm"
                variant="outline-danger"
                className=""
                onClick={handleDeleteAlbum}
                disabled={deleteAlbum.isDeleting || editAlbumName.isEditing}
              >
                <FontAwesomeIcon icon={faTrash} />
                <span className="ms-2">Delete album</span>
              </Button>
            </div>
          </Col>
        </Row>
      </Col>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change album name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddNewAlbumForm
            editMode={true}
            albumName={albumData.name}
            submitFunc={handleEditAlbumNameSubmit}
            loading={editAlbumName.isEditing}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AlbumInfo;
