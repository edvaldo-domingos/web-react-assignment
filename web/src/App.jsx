import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Navbar from "./components/Navbar";
import RecipesView from "./Presentation/Recipes/RecipesView";
const API_URL = "http://localhost:8080";

function App() {
  const checker = async () => {
    const health = await axios.get(`${API_URL}/health`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });

    console.log("Healh: ", health);
  };

  return (
    <Router>
      <CssBaseline />
      <Navbar currentNavItem="Recipes">
        <Switch>
          <Route exact path={"/"} component={RecipesView} />
        </Switch>
      </Navbar>
    </Router>
  );
}

export default App;
