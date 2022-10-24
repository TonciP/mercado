import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import RouterConfig from './RouterConfig/RouterConfig';
function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Container>
            <RouterConfig/>
          </Container>
        </div>
      </Router>
    </div>
  );
}

export default App;
