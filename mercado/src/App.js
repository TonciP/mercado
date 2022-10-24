import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import RouterConfig from "./RouterConfig/RouterConfig";
import Home from "./pages/Home";
import { useSelector } from "react-redux";

function App() {
  const token = useSelector((state) => state.login.token);
  return (
    <div className="App">
      <Router>
        <div>
          <Home />
          <Container>
            <RouterConfig />
          </Container>
        </div>
      </Router>
    </div>
  );
}

export default App;
