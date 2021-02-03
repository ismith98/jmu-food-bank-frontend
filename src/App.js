import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ItemList from "./components/ItemList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>JMU Pop-up Pantry Inventory</h1>
        <ItemList />
      </header>
    </div>
  );
}

export default App;
