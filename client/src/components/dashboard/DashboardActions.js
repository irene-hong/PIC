import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-primary"> </i> 编辑档案{" "}
      </Link>{" "}
      <Link to="/add-prof-exp" className="btn btn-light">
        <i className="fab fa-black-tie text-primary"> </i> 添加职业经历
      </Link>
      <Link to="/add-edu-exp" className="btn btn-light">
        <i className="fas fa-graduation-cap text-primary"> </i> 添加教育经历
      </Link>
    </div>
  );
};

export default DashboardActions;
