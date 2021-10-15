import { React, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">系友广场</Link>
      </li>
      <li>
        <Link to="/posts">找工作</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"></i> 我的
        </Link>
      </li>
      <li>
        <Link to="#!" onClick={logout}>
          <i className="fas fa-sign-out-alt"></i> 登出
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">系友广场</Link>
      </li>
      <li>
        <Link to="/register">注册</Link>
      </li>
      <li>
        <Link to="/login">登录</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="iconfont icon-guanzhu logo"></i> PIC
        </Link>
      </h1>
      {/* 当loading结束的时候显示下面的内容 */}
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.protoTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
