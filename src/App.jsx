import RoutesContainer from "./containers/RoutesContainer";
import AuthProvider from "./hooks/AuthProvider";
import ProfileProvider from "./hooks/ProfileProvider";

import Modal from "react-modal";

Modal.setAppElement("#root");
function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <RoutesContainer />
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;
