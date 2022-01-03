import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const LoginForm = () => {
  return (
    <Form className="w-50 mx-auto">

        <Form.Group className="mb-3" controlId="loginInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="loginInput2">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required />
        </Form.Group>

      <Button type="submit" variant="info" className="text-white my-3">
        Log in
      </Button>
    </Form>
  );
};

export default LoginForm;
