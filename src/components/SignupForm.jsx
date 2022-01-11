import { useAuthContext } from "../contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorAlert from "./ErrorAlert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SignupForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuthContext();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      return setError("Password does not match Confirm Password");
    }
    setError(null);

    try {
      setLoading(true);
      await signup(data.email, data.password);
      navigate("/");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <Form className="w-md-50 mx-auto" onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <ErrorAlert errMsg={error}/>
      )}

      <Form.Group className="mb-3" controlId="signupInput2">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder=""
          required
          {...register("email", { required: true })}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="signupInput3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          required
          {...register("password", { required: true })}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="signupInput4">
        <Form.Label>Confirm password</Form.Label>
        <Form.Control
          type="password"
          required
          {...register("confirmPassword", { required: true })}
        />
      </Form.Group>

      <div className="text-center">
        <Button
          type="submit"
          variant="info"
          className="text-white my-3"
          disabled={loading}
        >
          Sign up
        </Button>
      </div>
    </Form>
  );
};

export default SignupForm;
