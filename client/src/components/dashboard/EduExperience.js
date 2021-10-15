import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { formatDate } from "../../utils/formatDate";
import { deleteEduExperience } from "../../actions/profile";

const EduExperience = ({ education_experience, deleteEduExperience }) => {
  const experiences = education_experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.school}</td>
      <td className="hide-sm">{exp.degree}</td>
      <td className="hide-sm">{exp.major}</td>
      <td className="hide-sm">
        {formatDate(exp.from)} {exp.to ? `- ${formatDate(exp.to)}` : "至今"}
      </td>
      <td>
        <button className="btn" onClick={() => deleteEduExperience(exp._id)}>
          删除
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className="my-2">教育经历</h2>
      <table className="table">
        <thead>
          <tr>
            <th>学校</th>
            <th className="hide-sm">学位</th>
            <th className="hide-sm">专业</th>
            <th className="hide-sm">时间</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

EduExperience.propTypes = {
  education_experience: PropTypes.array.isRequired,
  deleteEduExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteEduExperience })(EduExperience);
