import * as React from "react";
import {
  ListItemText,
  ListItemIcon,
  MenuItem,
  Menu,
  Divider,
  Box,
} from "@mui/material";

type Props = {
  headers: any;
  menuItems: {
    name: string;
    action: () => void;
    icon: React.ReactElement | undefined;
    needDivider: boolean;
    isDisabled: boolean;
  }[];
};

export const MenuComponent = (Props: Props) => {
  const { headers, menuItems } = Props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLParagraphElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <div onClick={(e) => handleClick(e)}>{headers}</div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {menuItems.map((item, index) => (
          <Box key={index}>
            <MenuItem onClick={item.action} disabled={item.isDisabled}>
              {item.icon ? (
                <ListItemIcon>{item.icon}</ListItemIcon>
              ) : (
                <ListItemIcon>{""}</ListItemIcon>
              )}
              {item.name && <ListItemText>{item.name}</ListItemText>}
            </MenuItem>
            {item.needDivider && <Divider />}
          </Box>
        ))}
      </Menu>
    </div>
  );
};
