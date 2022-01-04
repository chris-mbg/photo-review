import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useAuthContext } from "../contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuthContext();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    setError(null);

    try {
      setLoading(true);
      await login(data.email, data.password);
      navigate("/");
      
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <Form className="w-50 mx-auto" onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <Alert variant="danger">
          <strong>Error!</strong>
          <p>{error}</p>
        </Alert>
      )}
      <Form.Group className="mb-3" controlId="loginInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder=""
          required
          {...register("email", { required: true })}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="loginInput2">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          required
          {...register("password", { required: true })}
        />
      </Form.Group>

      <Button
        type="submit"
        variant="info"
        className="text-white my-3"
        disabled={loading}
      >
        Log in
      </Button>
    </Form>
  );
};

export default LoginForm;
