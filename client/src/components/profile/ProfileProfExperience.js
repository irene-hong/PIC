import React from "react";
import PropTypes from "prop-types";
import { formatDate } from "../../utils/formatDate";

const ProfileProfExperience = ({
  experience: { company, title, location, current, to, from, description },
}) => {
  return (
    <div>
      <h3 class="text-dark">{company}</h3>
      <p>
        <strong>{title}</strong>
      </p>
      <p>
        {location} | {formatDate(from)} {to ? `- ${formatDate(to)}` : "至今"}
      </p>

      <p>{description}</p>
    </div>
  );
};

ProfileProfExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileProfExperience;
