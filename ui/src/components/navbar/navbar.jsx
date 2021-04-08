import { AppBar, Toolbar, Tab, Tabs } from "@material-ui/core";
import {
  AddCircle,
  Settings,
  Favorite,
  Home,
  Info,
  Person,
  ContactMail,
  AttachMoney,
  CalendarToday,
} from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import useStyles from "./navbarStyle";
import { connect } from "react-redux";
import { useState } from "react";
const NavBar = ({ user }) => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar className={classes.containerLinks}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          textColor="inherit"
          classes={{
            indicator: classes.indicator,
          }}
        >
          <Tab
            label="Home"
            icon={<Home />}
            component={NavLink}
            to="/"
            classes={{ selected: classes.selectedTab }}
          />
          {user && (
            <Tab
              label="Create Card"
              icon={<AddCircle />}
              component={NavLink}
              to="/create-card-house"
              classes={{ selected: classes.selectedTab }}
            />
          )}
          {user && (
            <Tab
              label="My Cards"
              icon={
                <i className="fas fa-house-user" style={{ fontSize: 25 }}></i>
              }
              component={NavLink}
              to="/my-cards"
              classes={{ selected: classes.selectedTab }}
            />
          )}
          <Tab
            label="RENT"
            icon={<CalendarToday />}
            component={NavLink}
            to="/houses/rent"
            classes={{ selected: classes.selectedTab }}
          />
          <Tab
            label="Sale"
            icon={<AttachMoney />}
            component={NavLink}
            to="/houses/sale"
            classes={{ selected: classes.selectedTab }}
          />
          {user && (
            <Tab
              label="Favorited Cards"
              icon={<Favorite />}
              component={NavLink}
              to="/favorite-cards"
              classes={{ selected: classes.selectedTab }}
            />
          )}
          {user && (
            <Tab
              label="settings"
              icon={<Settings />}
              component={NavLink}
              to="/settings"
              classes={{ selected: classes.selectedTab }}
            />
          )}
          <Tab
            label="About"
            icon={<Info />}
            component={NavLink}
            to="/about"
            classes={{ selected: classes.selectedTab }}
          />
          <Tab
            label="Contact Us"
            icon={<ContactMail />}
            component={NavLink}
            to="/contactUs"
            classes={{ selected: classes.selectedTab }}
          />
          {!user && (
            <Tab
              label="Login"
              icon={
                <i className="fas fa-sign-in-alt " style={{ fontSize: 25 }}></i>
              }
              component={NavLink}
              to="/login"
              classes={{ selected: classes.selectedTab }}
            />
          )}
          {user && (
            <Tab
              label="Logout"
              icon={
                <i
                  className="fas fa-sign-out-alt "
                  style={{ fontSize: 25 }}
                ></i>
              }
              component={NavLink}
              to="/logout"
              onClick={() => {
                setValue(1);
              }}
              classes={{ selected: classes.selectedTab }}
            />
          )}
          {!user && (
            <Tab
              label="Register"
              icon={<Person />}
              component={NavLink}
              to="/sign-up"
              classes={{ selected: classes.selectedTab }}
            />
          )}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(NavBar);
