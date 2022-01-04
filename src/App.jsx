import { Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import LoginPage from "./pages/LoginPage";
import RouteGuard from "./components/RouteGuard";
import NotFoundPage from "./pages/NotFoundPage";
import AlbumPage from "./pages/AlbumPage";

const App = () => {
  return (
    <>
      <Navigation />

      <Container className="App py-4">
        <Routes>
          {/* Unprotected routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <RouteGuard redirectTo="/login">
                <HomePage />
              </RouteGuard>
            }
          />
          <Route
            path="/album/:albumId"
            element={
              <RouteGuard redirectTo="/login">
                <AlbumPage />
              </RouteGuard>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
