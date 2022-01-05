import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";


const AddNewAlbumForm = ({ preselectedImages, editMode = false, albumName, submitFunc, loading = false }) => {
  // image array as prop if images from another album is selected
  // edit mode, albumName if changing album name
  // submitFunc for defining the submit function outside of the from

  const { register, handleSubmit } = useForm({
    defaultValues: {
      albumName: editMode ? albumName : ""
    }
  });

  const onSubmit = async (data) => submitFunc(data)

  return (
    <>
      <Form className="w-50 mx-auto" onSubmit={handleSubmit(onSubmit)}>

        <Form.Group className="mb-3" controlId="albumInput1">
          <Form.Label>{editMode ? "New Album Name" : "Album name"}</Form.Label>
          <Form.Control
            type="text"
            required
            {...register("albumName", { required: true })}
          />
        </Form.Group>

        <div className="d-flex justify-content-end">
          <Button
            type="submit"
            variant="info"
            className="text-white my-3"
            disabled={loading}
          >
            {editMode ? "Save": "Create Album"}
          </Button>
        </div>

        {preselectedImages && (
          <p>
            The album will contain your {preselectedImages.length} selected
            photos
          </p>
        )}
      </Form>
    </>
  );
};

export default AddNewAlbumForm;
