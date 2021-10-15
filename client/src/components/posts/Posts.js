import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { getAllPosts } from "../../actions/post";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

const Posts = ({ getAllPosts, loading, posts }) => {
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);
  return loading || posts == null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">正在招聘</h1>
      <p className="lead">抢先一步获得系友内推！</p>
      <PostForm />
      <div className="posts">
        {posts.map((post) => (
          <PostItem post={post} key={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getAllPosts: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => ({
  posts: state.post.posts,
  loading: state.loading,
});

export default connect(mapStatetoProps, { getAllPosts })(Posts);
