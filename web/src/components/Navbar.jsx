import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import styled from "styled-components";
import { ICONS } from "../utils/icons";
import _ from "lodash";
import PropTypes from "prop-types";
import { NAV_ITEMS } from "../utils/constants";

const drawerWidth = 240;

const StyledNavbarWrapper = styled(Box)``;

const StyledAppBar = styled(AppBar)``;

function Navbar({ currentNavItem, children }) {
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
            {currentNavItem}
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
                <ListItem button key={name}>
                  <ListItemIcon>{ICONS[name]}</ListItemIcon>
                  <ListItemText primary={_.capitalize(name)} />
                </ListItem>
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
