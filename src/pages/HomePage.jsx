import { useAuthContext } from "../contexts/AuthContext";

const HomePage = () => {
  const { currentUser } = useAuthContext();
  
  return (
    <>
      This is Home Page
      <h2>Hello {currentUser.email}</h2>
      <p className="my-5">Here be Add album component</p>
      <p>Here be Album Overview component</p>
    </>
  );
};

export default HomePage;
