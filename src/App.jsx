import RoutesContainer from "./containers/RoutesContainer";
import AuthProvider from "./hooks/AuthProvider";
import ProfileProvider from "./hooks/ProfileProvider";
import ChatProvider from "./hooks/ChatP";

import Modal from "react-modal";
import { ToastContainer } from "react-toastify";

Modal.setAppElement("#root");
function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <ChatProvider>

        <RoutesContainer />
        </ChatProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;
