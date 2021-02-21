import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ItemList from "./components/ItemList";
import { AlertProvider } from "./contexts/AlertContext";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>JMU Pop-up Pantry Inventory</h1>
        <AlertProvider>
          <ItemList />
        </AlertProvider>
      </header>
    </div>
  );
}

export default App;
