import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

const LoginPage = () => {
  return (
    <>
      <Tabs
        defaultActiveKey="login"
        id="uncontrolled-tab-example"
        className="mb-3 flex justify-content-center w-50 mx-auto"
      >
        <Tab eventKey="login" title="Log in">
          <LoginForm />
        </Tab>
        <Tab eventKey="signup" title="Sign up">
          <SignupForm />
        </Tab>
      </Tabs>


      {/* <p>Login form</p>
      <LoginForm />
      <hr />
      <p>Sign up form</p>

      <SignupForm /> */}
    </>
  );
};

export default LoginPage;
