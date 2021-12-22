import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import Navbar from "./components/Navbar";
import RecipesView from "./Presentation/Recipes/List/RecipesView";
import RecipesInfoView from "./Presentation/Recipes/Info/RecipesInfoView";
import { RecipesContextProvider } from "./ContextProviders/RecipesContext";
import { RECIPES_BAS_ROUTE } from "./utils/constants";

function App() {
  return (
    <RecipesContextProvider>
      <Router>
        <CssBaseline />
        <Navbar currentNavItem="Recipes">
          <Switch>
            <Route exact path={RECIPES_BAS_ROUTE} component={RecipesView} />
            <Route
              exact
              path={`${RECIPES_BAS_ROUTE}/new`}
              component={RecipesView}
            />
            <Route
              exact
              path={`${RECIPES_BAS_ROUTE}/:id/info`}
              component={RecipesInfoView}
            />
            <Route
              exact
              path={`${RECIPES_BAS_ROUTE}/:id/detail`}
              component={RecipesView}
            />
            <Redirect from="*" to={RECIPES_BAS_ROUTE} />
          </Switch>
        </Navbar>
      </Router>
    </RecipesContextProvider>
  );
}

export default App;
