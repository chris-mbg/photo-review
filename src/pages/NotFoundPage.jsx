import Alert from "react-bootstrap/Alert";

const NotFoundPage = () => {
  return (
    <>
      <Alert variant="warning" className="text-center mt-3">
        <p className="h3">Sorry, that page was not found...</p>
      </Alert>

    </>
  );
}

export default NotFoundPage;