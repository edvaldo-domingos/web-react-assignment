import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import Navbar from "./components/Navbar";
import RecipesView from "./Presentation/Recipes/List/RecipesView";
import BrewersListView from "./Presentation/Brewers/List/BrewersListView";
import BrewersInfoView from "./Presentation/Brewers/Info/BrewersInfoView";
import RecipesInfoView from "./Presentation/Recipes/Info/RecipesInfoView";
import { MainContextProvider } from "./ContextProviders/MainContext";
import { BREWERS_BAS_ROUTE, RECIPES_BAS_ROUTE } from "./utils/constants";
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
            <Route exact path={BREWERS_BAS_ROUTE} component={BrewersListView} />
            <Route
              exact
              path={`${BREWERS_BAS_ROUTE}/:id/info`}
              component={BrewersInfoView}
            />
            <Redirect from="*" to={RECIPES_BAS_ROUTE} />
          </Switch>
        </Navbar>
      </Router>
    </MainContextProvider>
  );
}

export default App;
