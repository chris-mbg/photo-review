import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";

const LoginPage = () => {
  return (
    <>
      <Tab.Container id="login-tabs" defaultActiveKey="login" className="">
        <Row>
          <Col lg={{ span: 6, offset: 3 }}>
            <Nav justify variant="tabs" id="login-tabs-nav">
              <Nav.Item>
                <Nav.Link eventKey="login">Log in</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="signup">Sign up</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col lg={{ span: 6, offset: 3 }}>
            <Tab.Content className="mt-4">
              <Tab.Pane eventKey="login">
                <LoginForm />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignupForm />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};

export default LoginPage;
