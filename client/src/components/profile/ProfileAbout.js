import React from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { username },
  },
}) => {
  return (
    <div class="profile-about bg-light p-2">
      <h2 class="text-primary">简介</h2>
      <p>{bio}</p>
      <div class="line"></div>
      <h2 class="text-primary">专长领域</h2>
      <div class="skills">
        {skills.map((skill) => (
          <div class="p-1">
            <i class="fa fa-check"></i> {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
