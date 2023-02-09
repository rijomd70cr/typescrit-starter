import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Toolbar, IconButton, Typography } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

import {
  openSideBarAction,
  getSideBarStatus,
  logout,
} from "../Reducer/LayoutActions";
import { useAppDispatch, useAppSelector } from "../../Services/Hook/Hook";

import { MenuComponent } from "../../Components/Menu";

const styles: { [key: string]: React.CSSProperties } = {
  flexGrow: { flexGrow: "1" },
  mr: { marginRight: "2" },
};
type action = {
  name: string;
  action: () => void;
  icon: React.ReactElement | undefined;
  needDivider: boolean;
  isDisabled: boolean;
};
const Header = () => {
  const dispatch = useAppDispatch();
  const isSideBarOpen = useAppSelector(getSideBarStatus);
  const navigate = useNavigate();

  const openSideBar = () => {
    dispatch(openSideBarAction(!isSideBarOpen));
  };
  const actions: action[] = [
    {
      name: "Profile",
      action: () => {
        console.log("profile");
      },
      icon: <PersonIcon fontSize="small" />,
      needDivider: false,
      isDisabled: false,
    },
    {
      name: "Logout",
      action: () => {
        logout();
        navigate("/login");
        window.location.reload();
      },
      icon: <LogoutIcon fontSize="small" />,
      needDivider: false,
      isDisabled: false,
    },
  ];

  return (
    <Box sx={styles.flexGrow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={styles.mr}
            onClick={() => openSideBar()}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={styles.flexGrow}>
            Chat
          </Typography>
          <MenuComponent
            headers={<AccountCircleIcon style={{ cursor: "pointer" }} />}
            menuItems={actions}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Header;
