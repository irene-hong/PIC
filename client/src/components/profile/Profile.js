import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileProfExperience from "./ProfileProfExperience";
import ProfileEduExperience from "./ProfileEduExperience";
import { getProfileById } from "../../actions/profile";

const Profile = ({ getProfileById, profile, auth, loading, match }) => {
  useEffect(() => {
    getProfileById(match.params.uid);
  }, [getProfileById, match]);

  return (
    <Fragment>
      {profile === null || loading === true ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-primary">
            系友广场
          </Link>
          {auth.isAuthenticated &&
            !auth.loading &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                编辑
              </Link>
            )}
          <div class="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 class="text-primary">职业经历</h2>
              {profile.professional_experience.length > 0 ? (
                profile.professional_experience.map((exp) => (
                  <ProfileProfExperience experience={exp} />
                ))
              ) : (
                <h4>TA还没有添加职业经历</h4>
              )}
            </div>
            <div className="profile-edu bg-white p-2">
              <h2 class="text-primary">教育背景</h2>
              {profile.education_experience.length > 0 ? (
                profile.education_experience.map((exp) => (
                  <ProfileEduExperience experience={exp} />
                ))
              ) : (
                <h4>TA还没有添加教育经历</h4>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  auth: state.auth,
  loading: state.loading,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
