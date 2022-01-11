import Alert from "react-bootstrap/Alert";

const ErrorAlert = ({ errMsg = "Something went wrong..." }) => {
  return (
    <Alert variant="danger">
      <p>
        <strong>Error!</strong>
      </p>
      {errMsg}
    </Alert>
  );
};

export default ErrorAlert;
