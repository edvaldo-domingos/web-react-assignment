import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import Navbar from "./components/Navbar";
import RecipesView from "./Presentation/Recipes/RecipesView";

function App() {
  return (
    <Router>
      <CssBaseline />
      <Navbar currentNavItem="Recipes">
        <Switch>
          <Route exact path={"/recipes"} component={RecipesView} />
          <Route component={RecipesView} />
        </Switch>
      </Navbar>
    </Router>
  );
}

export default App;
