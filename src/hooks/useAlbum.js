import { useFirestoreDocumentData } from "@react-query-firebase/firestore"
import { doc } from "firebase/firestore"
import { useAuthContext } from "../contexts/AuthContext"
import { db } from "../firebase"

const useAlbum = albumId => {
  const { currentUser } = useAuthContext()

  const albumRef = doc(db, "albums", albumId)

  const albumQuery = useFirestoreDocumentData(["album", albumId], albumRef, {
    subscribe: true,
    idField: "_id"
  },
  {
    refetchOnMount: "always"
  })

  return albumQuery
}

export default useAlbum