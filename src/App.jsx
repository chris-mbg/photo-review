import { Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <>
      <Navigation />

      <Container className="App py-4">
        <Routes>
          {/* Unprotected routes */}
          <Route path="/login" element={<LoginPage />}/>

          {/* Protected routes */}
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
