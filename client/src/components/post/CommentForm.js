import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

const CommentForm = ({ postid, addComment }) => {
  const [text, setText] = useState("");
  const onChange = (e) => {
    setText(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    addComment(postid, { text });
    setText("");
  };

  return (
    <div>
      <form className="form my-1" onSubmit={(e) => onSubmit(e)}>
        <div className="comment-form">
          <textarea
            name="text"
            id=""
            cols="20"
            rows="1"
            value={text}
            onChange={(e) => onChange(e)}
            placeholder="发表评论..."
          ></textarea>
          <input type="submit" className="btn" value="评论" />
        </div>
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
