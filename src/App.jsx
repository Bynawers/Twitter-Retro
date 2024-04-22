import RoutesContainer from "./containers/RoutesContainer";
import AuthProvider from "./hooks/AuthProvider";
import ChatProvider from "./hooks/ChatP";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";

Modal.setAppElement("#root");
function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <ToastContainer />
        <RoutesContainer />
        </ChatProvider>
    </AuthProvider>
  );
}

export default App;
