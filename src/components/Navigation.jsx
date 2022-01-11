import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const Navigation = () => {
  const { currentUser, logout } = useAuthContext();

  return (
    <Navbar
      collapseOnSelect
      expand="md"
      bg="info"
      variant="dark"
      className="p-2"
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="logo-text">
          Photo Review
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto text-center">
            {/* <p className="me-5">{ currentUser ? `Logged in: ${currentUser.email}` : "No one logged in" }</p> */}
            {currentUser ? (
              <>
                <Nav.Link as={NavLink} to="/" className="me-4">
                  Album Overview
                </Nav.Link>
                <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
              </>
            ) : (
              <Nav.Link as={NavLink} to="/login" className="me-4">
                Log in/Sign up
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
