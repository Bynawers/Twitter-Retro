import { useParams } from "react-router-dom";

function PostPhoto({ location }) {
  const image = location;

  console.log(image);
  return (
    <div className="flex h-screen">
      <main className="flex h-screen w-screen">
        <img
          className="flex rounded-xl object-cover mt-3"
          src={"./src/services/images-content/" + image}
        />
      </main>
    </div>
  );
}

export default PostPhoto;
