import { useLocation, Link } from "react-router-dom";

function User() {
  const location = useLocation();

  const username = location.pathname;

  return (
    <div className="flex h-screen">
      <main className="flex h-screen w-screen">{username}</main>
    </div>
  );
}

export default User;
