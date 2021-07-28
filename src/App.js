import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ProductPage from "./components/pages/ProductPage";
import HomePage from "./components/pages/HomePage";

function App() {
  return (
      <Router>
        <Switch>
          <Route path="/products" component={ProductPage} exact />
          <Route path="/" component={HomePage} exact />
        </Switch>
      </Router>
  );
};
export default App;
