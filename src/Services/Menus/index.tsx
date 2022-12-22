import DashboardIcon from '@mui/icons-material/Dashboard';
import InboxIcon from '@mui/icons-material/Inbox';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

interface IRouteDto {
  name: string,
  path: string,
  icon: any,
  submenu: any
}

export const Menu: IRouteDto[] = [
  {
    name: "DashBoard",
    path: "/dashbord",
    icon: <DashboardIcon />,
    submenu: [{ name: "DashBoard 1", path: "/dashbord1", icon: <InboxIcon /> ,submenu:[]}]
  },
  {
    name: "Customers",
    path: "/customers",
    icon: <AssignmentIndIcon />,
    submenu: []
  }
]