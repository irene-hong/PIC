import React from "react";
import PropTypes from "prop-types";
import { formatDate } from "../../utils/formatDate";

const ProfileEduExperience = ({
  experience: { school, from, to, current, degree, major, description },
}) => {
  return (
    <div>
      <h3>{school}</h3>
      <p>
        {formatDate(from)} {to ? `- ${formatDate(to)}` : "至今"}
      </p>
      <p>
        <strong>学位：</strong>
        {degree}
      </p>
      <p>
        <strong>专业：</strong>
        {major}
      </p>
      <p>
        <strong>描述：</strong>
        {description}
      </p>
    </div>
  );
};

ProfileEduExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileEduExperience;
