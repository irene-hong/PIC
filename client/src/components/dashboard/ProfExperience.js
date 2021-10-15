import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { deleteProfExperience } from "../../actions/profile";

const ProfExperience = ({
  professional_experience,
  deleteProfExperience,
  history,
}) => {
  const experiences = professional_experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        {formatDate(exp.from)} {exp.to ? `- ${formatDate(exp.to)}` : "至今"}
      </td>
      <td>
        <button
          className="btn"
          onClick={() => deleteProfExperience(exp._id, history)}
        >
          删除
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className="my-2">职业经历</h2>
      <table className="table">
        <thead>
          <tr>
            <th>公司</th>
            <th className="hide-sm">岗位</th>
            <th className="hide-sm">时间</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

ProfExperience.propTypes = {
  professional_experience: PropTypes.array.isRequired,
  deleteProfExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteProfExperience })(
  withRouter(ProfExperience)
);
