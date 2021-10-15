import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileItem = ({ profile }) => {
  const { user, status, company, location, skills } = profile;

  return (
    <div className="profile bg-light">
      <img src={user.avatar} className="round-img" alt="avatar" />
      <div>
        <h3>{user.username}</h3>
        <p>
          {company && <span> {company}</span>} {status}
        </p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/profile/${user._id}`} className="btn btn-primary">
          档案
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check"></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
