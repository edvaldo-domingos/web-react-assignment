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
import { MainContextProvider } from "./ContextProviders/MainContext";
import { RECIPES_BAS_ROUTE } from "./utils/constants";
// import RecipesDetailView from "./Presentation/Recipes/Detail/RecipesDetailView";
import RecipesNewView from "./Presentation/Recipes/New/RecipesNewView";

function App() {
  return (
    <MainContextProvider>
      <Router>
        <CssBaseline />
        <Navbar currentNavItem="Recipes">
          <Switch>
            <Route exact path={RECIPES_BAS_ROUTE} component={RecipesView} />
            <Route
              exact
              path={`${RECIPES_BAS_ROUTE}/new`}
              component={RecipesNewView}
            />
            <Route
              exact
              path={`${RECIPES_BAS_ROUTE}/:id/info`}
              component={RecipesInfoView}
            />
            <Redirect from="*" to={RECIPES_BAS_ROUTE} />
          </Switch>
        </Navbar>
      </Router>
    </MainContextProvider>
  );
}

export default App;
