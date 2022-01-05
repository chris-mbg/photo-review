import { useFirestoreQueryData } from "@react-query-firebase/firestore"
import { collection, query, where } from "firebase/firestore"
import { db } from "../firebase"

const useReviewAlbum = viewId => {

  const colRef = collection(db, "albums")
  const queryRef = query(colRef, where("viewId", "==", viewId))

  const albumQuery = useFirestoreQueryData(["album-view", viewId], queryRef, {
    subscribe: true,
    idField: "_id"
  },
  {
    refetchOnMount: "always"
  })

  return albumQuery
}

export default useReviewAlbum