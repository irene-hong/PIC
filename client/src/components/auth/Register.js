import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
// import axios from 'axios';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types'


const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    });

    const { username, email, password, password2 } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }  

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2){
            setAlert('两次输入密码不匹配！', 'danger'); 
        } else {   
            register({ username, email, password });
            // 以下为测试代码
            // console.log(formData);
            // const newUser = {
            //     username, email, password
            // };
            // try{
            //     const config = {
            //         headers: {
            //             'Content-Type':'application/json'
            //         }
            //     };
            //     const body = JSON.stringify(newUser);
            //     const res = await axios.post('/api/users', body, config);
            //     console.log(res.data);
            // }catch(err){
            //     console.log(err.response.data);
            // }
            
        }
    }

    // redirct
    if (isAuthenticated) {
        return (
            <Redirect to="/dashboard" />
        )
    }

    return (
        <Fragment>
            <h1 className="large text-primary">注册</h1>
            <p className="lead">  欢迎加入信管大家庭! </p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                <input type="text" 
                        placeholder="用户名" 
                        name="username" 
                        value={username} 
                        onChange={e => onChange(e)} 
                        required 
                />
                </div>
                <div className="form-group">
                <input type="email" 
                        placeholder="邮箱" 
                        name="email" 
                        value={email} 
                        onChange={e => onChange(e)} 
                        required
                />
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="密码（不少于6位）"
                    name="password"
                    minLength="6"
                    value={password} 
                    onChange={e => onChange(e)} 
                    required
                />
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="确认密码"
                    name="password2"
                    minLength="6"
                    value={password2} 
                    onChange={e => onChange(e)} 
                    required
                />
                </div>
                <input type="submit" className="btn btn-primary" value="注册" />
            </form>
            <p className="my-1">
                已经有账号? <Link to="/login">登录</Link>
            </p>
        </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register)
