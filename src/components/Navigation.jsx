import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

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
            {currentUser ? (
              <>
                <Nav.Link as={NavLink} to="/" className="me-4">
                  Album Overview
                </Nav.Link>
                <NavDropdown
                  title={<FontAwesomeIcon icon={faUser} />}
                  id="navigation-dropdown"
                  align="end"
                >
                  <NavDropdown.Item
                    as="p"
                    className="text-center"
                  >
                    <small>
                      Logged in: <br /> {currentUser.email}
                    </small>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item className="text-center">
                    <Button
                      variant="info"
                      size="sm"
                      className="text-white"
                      onClick={() => logout()}
                    >
                      Logout
                    </Button>
                  </NavDropdown.Item>
                </NavDropdown>
                {/* <span>Logged in: {currentUser.email}</span>
                <Nav.Link onClick={() => logout()}>Logout</Nav.Link> */}
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
