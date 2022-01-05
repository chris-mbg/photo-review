import { useFirestoreQueryData } from "@react-query-firebase/firestore"
import { collection, query, where, orderBy } from "firebase/firestore"
import { useAuthContext } from "../contexts/AuthContext"
import { db } from "../firebase"

const useAlbums = () => {
  const { currentUser } = useAuthContext()

  const colRef = collection(db, "albums")
  const albumsQueryRef = query(colRef, where("owner", "==", currentUser.uid), orderBy("createdAt", "desc"))

  const albumsQuery = useFirestoreQueryData(["albums", currentUser.uid], albumsQueryRef, {
    subscribe: true,
    idField: "_id"
  }, {
    refetchOnMount: "always"
  })

  return albumsQuery
}

export default useAlbums