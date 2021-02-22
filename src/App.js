import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import List from "./components/List";
import { AlertProvider } from "./contexts/AlertContext";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>JMU Pop-up Pantry Inventory</h1>
        <AlertProvider>
          <List />
        </AlertProvider>
      </header>
    </div>
  );
}

export default App;
