import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
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
export default Landing;
