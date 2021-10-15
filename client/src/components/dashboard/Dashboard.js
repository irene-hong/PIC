import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import ProfExperience from "./ProfExperience";
import EduExperience from "./EduExperience";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading || profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">{user && user.username}</h1>
      <p className="lead">欢迎回来！在这里浏览或编辑您的系友档案</p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <ProfExperience
            professional_experience={profile.professional_experience}
          />
          <EduExperience education_experience={profile.education_experience} />
        </Fragment>
      ) : (
        <Fragment>
          <p>您目前还没有个人档案</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            去创建
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
