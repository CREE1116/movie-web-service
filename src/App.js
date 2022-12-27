import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/Movie/:id" component={Detail} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
