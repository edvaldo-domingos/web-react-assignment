import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
// import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import styled from "styled-components";
import { ICONS } from "../utils/icons";
import _ from "lodash";
import PropTypes from "prop-types";
import { NAV_ITEMS, UI_ROUTES } from "../utils/constants";
import { MainContext } from "../ContextProviders/MainContext";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

const drawerWidth = 240;

const StyledNavbarWrapper = styled(Box)``;

const StyledAppBar = styled(AppBar)``;

function Navbar({ children }) {
  const { appBarTile, setAppBarTitle } = useContext(MainContext);
  const [activeNavItem, setActiveNavItem] = useState(NAV_ITEMS.recipes.name);
  const history = useHistory();

  const setActiveItem = (navItemName) => {
    setActiveNavItem(navItemName);
    setAppBarTitle(_.capitalize(navItemName));
    history.push(`${UI_ROUTES[navItemName]}`);
  };

  return (
    <StyledNavbarWrapper sx={{ display: "flex" }}>
      <StyledAppBar
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {appBarTile}
          </Typography>
        </Toolbar>
      </StyledAppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {[NAV_ITEMS.users.name, NAV_ITEMS.recipes.name].map(
              (name, index) => (
                <ListItemButton
                  key={name}
                  onClick={() => setActiveItem(name)}
                  selected={activeNavItem === name}
                >
                  <ListItemIcon>{ICONS[name]}</ListItemIcon>
                  <ListItemText primary={_.capitalize(name)} />
                </ListItemButton>
              )
            )}
          </List>
        </Box>
      </Drawer>
      {children}
    </StyledNavbarWrapper>
  );
}

Navbar.propTypes = {
  currentNavItem: PropTypes.string.isRequired,
};

export default Navbar;
