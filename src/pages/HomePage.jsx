import AddNewAlbum from "../components/AddNewAlbum";
import { useAuthContext } from "../contexts/AuthContext";

const HomePage = () => {
  const { currentUser } = useAuthContext();

  return (
    <>
      <AddNewAlbum />

      <p>Here be Album Overview component</p>
    </>
  );
};

export default HomePage;
