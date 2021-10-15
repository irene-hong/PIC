import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'


const Landing = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                <h1 className="x-large"><b>P</b>KU <b>I</b>M <b>C</b>onnect</h1>
                <p className="lead">
                    北大信管系友行业联络平台
                </p>
                <div className="buttons">
                    <Link to="/register" className="btn btn-primary">注册</Link>
                    <Link to="/login" className="btn btn-light">登录</Link>
                </div>
                </div>
            </div>
        </section>
    )
};

Landing.protoTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated 
})

export default connect(mapStateToProps)(Landing);
