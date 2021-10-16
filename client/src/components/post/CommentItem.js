import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { formatDateCHN } from "../../utils/formatDate";
import { removeComment } from "../../actions/post";

const CommentItem = ({
  auth,
  postid,
  comment: { _id, user, text, username, date },
  removeComment,
}) => {
  return (
    <div className="comment bg-white p-1">
      <p>{text}</p>
      <div className="comment-author">
        <Link to={`/profile/${user}`}>{username}</Link>
        <span className="post-date">
          &nbsp;&nbsp;&nbsp;{formatDateCHN(date)}&nbsp;&nbsp;&nbsp;
        </span>
        {!auth.loading && user === auth.user._id && (
          <span
            onClick={(e) => removeComment(postid, _id)}
            className="comment-btn"
          >
            删除
          </span>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  postid: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  removeComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { removeComment })(CommentItem);
