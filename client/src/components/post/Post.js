import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Spinner from "../layout/Spinner";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import { formatDateV2 } from "../../utils/formatDate";

// import { addLike } from "../../actions/post";
import { getSinglePost } from "../../actions/post";

const Post = ({ getSinglePost, post: { post, loading }, match }) => {
  useEffect(() => {
    getSinglePost(match.params.postid);
  }, [getSinglePost, match]);

  return (
    <Fragment>
      {post === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="single-post bg-white p-1 my-1">
            <Link to="/posts" className="btn my-1">
              返回首页
            </Link>
            <p className="post-title">{post.title}</p>
            <p className="post-author">
              <span>发布者： </span>
              <Link to={`/profile/${post.user}`}>{post.username}</Link> &nbsp;于
              <span>{formatDateV2(post.date)}</span>
            </p>
            <p>{post.content}</p>
            <CommentForm postid={post._id} />
            {/* <button
            type="button"
            className="btn btn-light"
            onClick={(e) => addLike(_id)}
          >
            <i className="fas fa-thumbs-up"></i>
            {likes.length > 0 && <span> {likes.length}</span>}
          </button> */}
            {/* <Link to={`/posts/${_id}`} className="btn btn-light">
            <i className="fas fa-comment"></i>
            {comments.length > 0 && <span> {comments.length}</span>}
          </Link> */}
            {/* {!auth.loading && user === auth.user._id && (
            <button
              type="button"
              className="btn btn-light"
              onClick={(e) => deletePost(_id)}
            >
              删除
            </button>
          )} */}
          </div>
          {post.comments && (
            <div className="comments">
              {post.comments.map((comment) => (
                <CommentItem
                  key={comment._id}
                  comment={comment}
                  postid={post._id}
                />
              ))}
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

Post.propTypes = {
  getSinglePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  loading: state.loading,
});

export default connect(mapStateToProps, { getSinglePost })(Post);
