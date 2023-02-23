import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../Services/Hook/Hook";
import {
  openSideBarAction,
  getSelectedIndexAction,
  setselectedIndexAction,
} from "../Reducer/LayoutActions";

import {
  Box,
  Collapse,
  ListItemButton,
  List,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import { Menu } from "../../Services/Menus";

const SideBar = () => {
  const dispatch = useAppDispatch();
  const navFunc = useNavigate();

  interface SubMenU {
    name: string;
    path: string;
    icon: any;
    submenu: any;
  }
  // const [selectedIndex] = useState(useAppSelector(getSelectedIndexAction));
  const [open, setOpen] = useState(false);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    path: string,
    type: string
  ) => {
    if (type === "submenu") {
      setOpen(!open);
    } else {
      dispatch(setselectedIndexAction(index));
      dispatch(openSideBarAction(false));
      navFunc(path);
    }
  };

  const renderNavigation = (
    item: { submenu: SubMenU[]; path: string; name: string; icon: any },
    key: number,
    type: string
  ) => {
    return (
      <List
        key={key}
        sx={{ bgcolor: "background.paper" }}
        component="nav"
        aria-label="main mailbox folders"
      >
        <ListItemButton
          onClick={(event) => handleListItemClick(event, key, item.path, type)}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
          {item.submenu.length > 0 && (open ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>

        {type === "submenu" && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            {item.submenu.map((subitem, index) => {
              if (subitem.submenu.length > 0) {
                return renderNavigation(subitem, index, "submenu");
              } else {
                return renderNavigation(subitem, index, "mainmenu");
              }
              return <div></div>;
            })}
          </Collapse>
        )}
      </List>
    );
  };

  return (
    <Box sx={{ width: "260px", background: "#fff", marginTop: "5px" }}>
      {Menu.map((item, key) => {
        if (item.submenu.length > 0) {
          return renderNavigation(item, key, "submenu");
        } else {
          return renderNavigation(item, key, "mainmenu");
        }
        return <div></div>;
      })}
    </Box>
  );
};
export default SideBar;
