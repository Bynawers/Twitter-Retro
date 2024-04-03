import RoutesContainer from "./containers/RoutesContainer";
import AuthProvider from "./hooks/AuthProvider";
import Modal from "react-modal";

Modal.setAppElement("#root");
function App() {
  return (
    <AuthProvider>
      <RoutesContainer />
    </AuthProvider>
  );
}

export default App;
