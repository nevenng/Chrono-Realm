import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Logout, AdminDashboard } from '../components';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const Navbar = (props) => {
  const { userToken, setUserToken, user, setUser } = props;
  const [openMenu, setOpenMenu] = useState(false);
  const history = useHistory();

  const handleLogout = () => {
    setUserToken(null);
    setUser(null);
    history.push("/");
  };

  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
      link: "/home",
    },
    user?.role === "admin" && {
        text: "Dashboard",
        icon: <AdminPanelSettingsIcon />,
        link: "/admin/dashboard",
      },
    {
      text: "All Products",
      icon: <InfoIcon />,
      link: "/products",
    },
    userToken && {
      text: "My Orders",
      icon: <PersonIcon />,
      link: "/orders",
    },
    {
      text: "Cart",
      icon: <ShoppingCartRoundedIcon />,
      link: "/cart",
    },
    
    {
      text: userToken ? "Logout" : "Login",
      icon: userToken ? <LogoutIcon /> : <LoginIcon />,
      onClick: () => {
        if (userToken) {
          handleLogout();
        } else {
          history.push("/account/login");
        }
      },
      link: "/account/login",
    },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="nav-link">
          <div className="navbar-logo">Gamers</div>
        </Link>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/products" className="nav-link">
              All Products
            </Link>
          </li>
          {userToken && (
            <li className="nav-item">
              <Link to="/orders" className="nav-link">
                My Orders
              </Link>
            </li>
          )}
          <li className="nav-item">
            <Link to="/cart" className="nav-link">
              Cart
            </Link>
          </li>
          <li className="nav-item">
            {userToken ? (
              <a onClick={handleLogout} className="nav-link nav-link-button">
                Logout
              </a>
            ) : (
              <Link to="/account/login" className="nav-link">
                Login
              </Link>
            )}
          </li>
          {user?.role === "admin" && (
            <li className="nav-item">
              <Link to="/admin/dashboard" className="nav-link">
                Dashboard
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} style={{ width: "36px" }} />
      </div>
      <Drawer  open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          className="side-menu-box"
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              item && (
                <ListItem
                  key={item.text}
                  disablePadding
                  button
                  component={Link}
                  to={item.link}
                  onClick={item.onClick}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              )
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;
