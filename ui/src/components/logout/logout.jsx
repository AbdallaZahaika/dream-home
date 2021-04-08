/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from "react-redux";
import { setUser } from "../../store/user/userActions";
import { useHistory } from "react-router-dom";
import { logout } from "../../services/userService";
import { useEffect } from "react";
const Logout = ({ setUser }) => {
  const history = useHistory();
  useEffect(() => {
    logout();
    setUser(null);
    history.replace("/");
  }, []);

  return null;
};

/// this function get the user state
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

/// this function change the  user state
const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
