import { Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import LoginPage from "./pages/LoginPage";
import RouteGuard from "./components/RouteGuard";
import NotFoundPage from "./pages/NotFoundPage";
import AlbumPage from "./pages/AlbumPage";
import { ReactQueryDevtools } from "react-query/devtools";
import ReviewAlbumPage from "./pages/ReviewAlbumPage";

const App = () => {
  return (
    <>
      <Navigation />

      <Container className="App py-4">
        <Routes>
          {/* Unprotected routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/view/album/:viewId" element={<ReviewAlbumPage />} />

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

      <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
    </>
  );
};

export default App;
