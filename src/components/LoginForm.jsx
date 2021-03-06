import { useAuthContext } from "../contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorAlert from "./ErrorAlert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
    <Form className="w-md-50 mx-auto" onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <ErrorAlert errMsg={error} />
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

      <div className="text-center">
        <Button
          type="submit"
          variant="info"
          className="text-white my-3"
          disabled={loading}
        >
          Log in
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
