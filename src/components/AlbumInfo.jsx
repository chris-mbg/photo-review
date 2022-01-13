import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { serverTimestampConvert } from "../utils/serverTimestampConvert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faCopy } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../contexts/AuthContext";
import useDeleteAlbum from "../hooks/useDeleteAlbum";
import useModal from "../hooks/useModal";
import useEditAlbumName from "../hooks/useEditAlbumName";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddNewAlbumForm from "./AddNewAlbumForm";
import ModalComponent from "./ModalComponent";

const AlbumInfo = ({ albumData }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();
  const { show, handleClose, handleShow } = useModal();
  const editAlbumName = useEditAlbumName();
  const deleteAlbum = useDeleteAlbum();

  const [showTooltip, setShowTooltip] = useState(false);
  const target = useRef(null);

  const handleDeleteAlbum = async () => {
    await deleteAlbum.destroy(albumData._id);
    navigate("/");
  };

  const handleEditAlbumNameSubmit = async (data) => {
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
    setShowTooltip(true)
    setTimeout(() => setShowTooltip(false), 2000)
  };

  if (albumData.owner !== currentUser.uid) {
    return <p>This album does not belong to you!</p>;
  }

  return (
    <div className="d-flex flex-column flex-nowrap mb-3 mb-lg-0">
      <h1 className="logo-text text-center mb-3 order-lg-2 mt-lg-3">
        {albumData.name}
      </h1>
      <Col xs={12} lg={{ span: 4, offset: 8 }}>
        <Row xs={1} sm={2} lg={2} className="text-muted border rounded g-2 p-1">
          <Col>
            <Col>
              <small>
                {albumData.images.length}{" "}
                {albumData.images.length === 1 ? "photo" : "photos"}
              </small>
            </Col>
            <Col>
              <small>
                Created: {serverTimestampConvert(albumData.createdAt)}
              </small>
            </Col>
          </Col>
          <Col>
            <Col>
              <small>
                Reviewed: {albumData.reviewed.length}{" "}
                {albumData.reviewed.length === 1 ? "time" : "times"}
              </small>
            </Col>
            <Col>
              <small>
                <Link to={`/view/album/${albumData.viewId}`}>Review page</Link>
                <span className="ms-3 cursor-pointer" ref={target}  onClick={handleCopyLink}>
                  <FontAwesomeIcon icon={faCopy} title="Copy link!" />
                  <Overlay
                    target={target.current}
                    show={showTooltip}
                    placement="right"
                    className="bg-success text-white"
                  >
                    {(props) => (
                      <Tooltip id="overlay-example" {...props}>
                        <span >Copied!</span>
                      </Tooltip>
                    )}
                  </Overlay>
                </span>
              </small>
            </Col>
          </Col>
          <Col xs={{ span: 6 }} sm={{ span: 6 }}>
            <Button
              size="sm"
              variant="outline-info"
              className=""
              onClick={handleShow}
              disabled={deleteAlbum.isDeleting || editAlbumName.isEditing}
            >
              <FontAwesomeIcon icon={faPen} />
              <span className="ms-2">Edit name</span>
            </Button>
          </Col>
          <Col
            xs={{ span: 6 }}
            sm={{ span: 6 }}
            className="text-end text-sm-start"
          >
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
          </Col>
        </Row>
      </Col>

      <ModalComponent
        show={show}
        onHide={handleClose}
        title="Change album name"
      >
        <AddNewAlbumForm
          editMode={true}
          albumName={albumData.name}
          submitFunc={handleEditAlbumNameSubmit}
          loading={editAlbumName.isEditing}
        />
      </ModalComponent>
    </div>
  );
};

export default AlbumInfo;
