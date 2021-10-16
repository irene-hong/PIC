import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { formatDateV2 } from "../../utils/formatDate";
import { addLike, removeLike, deletePost } from "../../actions/post";

const PostItem = ({
  auth,
  post: { _id, user, username, content, title, date, likes, comments },
  addLike,
  removeLike,
  deletePost,
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div className="post-title">
        <Link to={`/posts/${_id}`}>
          <p>{title}</p>
        </Link>
        <Link to={`/profile/${user}`}>
          <p className="post-author">{username}</p>
        </Link>
      </div>

      <div>
        <p>{content}</p>
        <p className="post-date">发布于 {formatDateV2(date)}</p>
        <button
          type="button"
          className="btn btn-light"
          onClick={(e) => addLike(_id)}
        >
          <i className="fas fa-thumbs-up"></i>
          {likes.length > 0 && <span> {likes.length}</span>}
        </button>
        <Link to={`/posts/${_id}`} className="btn btn-light">
          <i className="fas fa-comment"></i>
          {comments.length > 0 && <span> {comments.length}</span>}
        </Link>
        {!auth.loading && user === auth.user._id && (
          <button
            type="button"
            className="btn btn-light"
            onClick={(e) => deletePost(_id)}
          >
            删除
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
