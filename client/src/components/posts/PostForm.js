import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

const PostForm = ({ addPost }) => {
  const [formData, setFormData] = useState({
    content: "",
    title: "",
  });
  const { content, title } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addPost(formData);
    setFormData({
      content: "",
      title: "",
    });
  };

  return (
    <div className="post-form">
      <form className="form my-1" onSubmit={(e) => onSubmit(e)}>
        <div className="form-submit-line">
          <textarea
            name="title"
            id=""
            cols="20"
            rows="1"
            value={title}
            onChange={(e) => onChange(e)}
            placeholder="取个标题"
          ></textarea>
          <input type="submit" className="btn" value="发布" />
        </div>
        <textarea
          name="content"
          cols="30"
          rows="4"
          placeholder="在这里发布一则招聘"
          value={content}
          onChange={(e) => onChange(e)}
          required
          className="my-1"
        ></textarea>
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
