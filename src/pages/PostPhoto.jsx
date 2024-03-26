import { useLocation } from "react-router-dom";

function PostPhoto() {
  const location = useLocation();

  const image = location.state.image;

  console.log(image);
  return (
    <div className="flex h-screen">
      <main className="flex h-screen w-screen">
        <img
          className="flex rounded-xl object-cover mt-3"
          src={"/src/services/images-content/" + image}
        />
      </main>
    </div>
  );
}

export default PostPhoto;
