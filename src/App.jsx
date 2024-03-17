import RoutesContainer from "./containers/RoutesContainer";
import AuthProvider from "./hooks/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <RoutesContainer />
    </AuthProvider>
  );
}

export default App;
