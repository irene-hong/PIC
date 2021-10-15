import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addProfExperience } from "../../actions/profile";

const AddProfExp = ({ addProfExperience, history }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { company, title, location, from, to, current, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addProfExperience(formData, history);
  };

  return (
    <Fragment>
      <h1 class="large text-primary">添加职业经历</h1>
      <p class="lead">请分别填写并提交每段经历</p>
      <small>* = 必填项</small>
      <form class="form" onSubmit={(e) => onSubmit(e)}>
        <div class="form-group">
          <input
            type="text"
            placeholder="* 工作岗位"
            name="title"
            value={title}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="* 公司"
            name="company"
            value={company}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="地点"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class="form-group">
          <h4>开始时间</h4>
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
            是当前工作
          </p>
        </div>
        <div class="form-group">
          <h4>结束时间</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={(e) => onChange(e)}
            disabled={toDateDisabled ? "disabled" : ""}
          />
        </div>
        <div class="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="工作描述"
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

AddProfExp.propTypes = {
  addProfExperience: PropTypes.func.isRequired,
};

export default connect(null, { addProfExperience })(withRouter(AddProfExp));
