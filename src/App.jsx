import RoutesContainer from "./containers/RoutesContainer";
import AuthProvider from "./hooks/AuthProvider";
import ChatProvider from "./hooks/ChatP";
import Modal from "react-modal";

Modal.setAppElement("#root");
function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <RoutesContainer />
        </ChatProvider>
    </AuthProvider>
  );
}

export default App;
