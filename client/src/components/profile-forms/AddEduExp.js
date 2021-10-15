import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addEduExperience } from "../../actions/profile";

const AddEduExp = ({ addEduExperience, history }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    major: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { school, degree, major, from, to, current, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addEduExperience(formData, history);
  };

  return (
    <Fragment>
      <h1 class="large text-primary">添加教育经历</h1>
      <p class="lead"> 请分别填写并提交每段教育经历</p>
      <small>* = 必填项</small>
      <form class="form" onSubmit={(e) => onSubmit(e)}>
        <div class="form-group">
          <input
            type="text"
            placeholder="*学校"
            name="school"
            value={school}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="*学位"
            value={degree}
            onChange={(e) => onChange(e)}
            name="degree"
            required
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="*专业"
            name="major"
            value={major}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class="form-group">
          <h4>*开始时间</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
            />{" "}
            当前在读
          </p>
        </div>
        <div class="form-group">
          <h4>结束时间</h4>
          <input
            type="date"
            name="to"
            value={to}
            disabled={toDateDisabled ? "disabled" : ""}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="教育经历描述"
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" class="btn btn-primary my-1" value="提交" />
        <Link class="btn btn-light my-1" to="/dashboard">
          取消
        </Link>
      </form>
    </Fragment>
  );
};

AddEduExp.propTypes = {
  addEduExperience: PropTypes.func.isRequired,
};

export default connect(null, { addEduExperience })(withRouter(AddEduExp));
