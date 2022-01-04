import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
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
          <Nav className="ms-auto">
            <p className="me-5">{ currentUser ? `Logged in: ${currentUser.email}` : "No one logged in" }</p>
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

            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
