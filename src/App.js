import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ItemList from "./components/ItemList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>JMU Food Bank Inventory</h1>
        <h2>Add Items</h2>
        <ItemList />
      </header>
    </div>
  );
}

export default App;
