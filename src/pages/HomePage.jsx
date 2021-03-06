import AddNewAlbum from "../components/AddNewAlbum";
import AlbumOverview from "../components/AlbumOverview";

const HomePage = () => {
  return (
    <>
      <AddNewAlbum />

      <hr className="border-top border-info my-4" />

      <AlbumOverview />
    </>
  );
};

export default HomePage;
