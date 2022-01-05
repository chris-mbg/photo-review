import { serverTimestampConvert } from "../utils/serverTimestampConvert";

const AlbumInfo = ({ albumData }) => {
  return (
    <>
      <div className="text-muted d-flex justify-content-end">
        <div className="border p-2 d-flex flex-column flex-nowrap rounded">
          <span>{albumData.images.length} photos</span>
          <span>Created: {serverTimestampConvert(albumData.createdAt)}</span>
          <span>Reviewed: {albumData.reviewed.length} times</span>
        </div>
      </div>
      <h1 className="text-center mb-3">
        {albumData.name}
      </h1>
    </>
  );
};

export default AlbumInfo;
