import Alert from "react-bootstrap/Alert";

const InfoAlert = ({ msg }) => {
  return (
    <Alert variant="info" className="text-center">
      {msg}
    </Alert>
  );
};

export default InfoAlert;
