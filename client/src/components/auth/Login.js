import React, { Fragment, useState }  from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }  

    const onSubmit = async (e) => {
        e.preventDefault();
        login({email, password});
        
        // 以下为测试代码
        // console.log(formData)
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

    // redirect
    if (isAuthenticated){
        return <Redirect to="/dashboard" />
    }

    return (
        <Fragment>
            <h1 className="large text-primary">登录</h1>
            <p className="lead">登录您的系友账号</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
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
                    placeholder="密码"
                    name="password"
                    minLength="6"
                    value={password} 
                    onChange={e => onChange(e)} 
                    required
                />
                </div>
                
                <input type="submit" className="btn btn-primary" value="登录" />
            </form>
            <p className="my-1">
                还没有系友账号？ <Link to="/register">注册</Link>
            </p>
        </Fragment>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login);

