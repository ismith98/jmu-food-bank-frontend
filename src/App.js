import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AlertProvider } from "./contexts/AlertContext";
import { CategoriesProvider } from "./contexts/CategoriesContext";
import Routes from "./Routes";
import SystemAlert from "./components/general/SystemAlert";


function App() {
  return (
        <AlertProvider>
          <CategoriesProvider>
            <Routes />
            {/* Component for System Messages */}
            <SystemAlert />
          </CategoriesProvider>
        </AlertProvider>
  );
}

export default App;
