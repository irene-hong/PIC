import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";

// createProfile action同时用于创建和编辑
const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    graduation_year: 2021,
    status: "",
    company: "",
    location: "",
    bio: "",
    skills: "",
    website: "",
  });

  useEffect(() => {
    getCurrentProfile();
    // eslint-disable-next-line
    setFormData({
      graduation_year:
        loading || !profile.graduation_year ? "" : profile.graduation_year,
      status: loading || !profile.status ? "" : profile.status,
      company: loading || !profile.company ? "" : profile.company,
      location: loading || !profile.location ? "" : profile.location,
      bio: loading || !profile.bio ? "" : profile.bio,
      skills: loading || !profile.skills ? "" : profile.skills.join(" "),
      website: loading || !profile.website ? "" : profile.website,
    });
  }, [loading, getCurrentProfile]);

  const { graduation_year, status, company, location, bio, skills, website } =
    formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true); // edit = true
  };

  return (
    <Fragment>
      <h1 className="large text-primary">编辑我的档案</h1>
      <p className="lead">完善资料，让更多的系友认识你吧！</p>
      <small>* = 必填项</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <select name="status" value={status} onChange={(e) => onChange(e)}>
            <option value="0">* 当前身份</option>
            <option value="学生">学生</option>
            <option value="在职">在职</option>
            <option value="其他">其他</option>
          </select>
        </div>

        <div className="form-group">
          <label>毕业年份 </label>
          <input
            type="number"
            name="graduation_year"
            value={graduation_year}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="当前学校/公司"
            name="company"
            value={company}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">例：北京大学信息管理系</small>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="所在地"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">例：中国上海</small>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="个人网站"
            name="website"
            value={website}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">博客，领英账号，社交媒体等均可</small>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="* 技能/领域"
            name="skills"
            value={skills}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            请列举您所擅长的技能或领域，以空格分隔，如IT咨询
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="来点自我介绍..."
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>

        <input type="submit" className="btn btn-primary my-1" value="提交" />
        <Link className="btn btn-light my-1" to="/dashboard">
          取消
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
