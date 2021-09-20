import React, { useState } from 'react';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import {signIn} from '../actions';

import apildm from '../apis/apildm';


const Login = (props) => {
    const initialState = {
        username: '',
        password: '',
        isSubmiting: false,
        errorMessage: null,
        // isVerified: false
    };
    const [data, setData] = useState(initialState);
    const handleCahnge = event => {
        setData({
            ...data,
            [event.target.name]: [event.target.value]
        })
    };
    const handleSubmit = event => {
        event.preventDefault();
        if((data.username != null)&& (data.password != null)){
            setData({
                ...data,
                isSubmiting: true,
                errorMessage: null
            });

            const reqBody = JSON.stringify({
                username: data.username[0],
                password: data.password[0]
            });

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            apildm.post('/user/login', reqBody, config)
            .then(res => {
                if (res.data.resCode === '200') {
                    props.signIn(res.data.values);
                    props.history.push('/');
                } else {
                    setData({
                        ...data,
                        isSubmiting: false,
                        errorMessage: res.data.resDesc
                    })
                }
            })
        }
    }
    return (
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                                    <div className="card-body">

                                        <form onSubmit={handleSubmit}>
                                            {
                                                data.errorMessage && (
                                                    <div className="alert alert-danger" role="alert">
                                                        {data.errorMessage}
                                                    </div>
                                                )
                                            }
                                            <div className="form-floating mb-3">
                                                <input className="form-control" name="username" value={data.username} onChange={handleCahnge} type="text" />
                                                <label>Username</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" name="password" value={data.password} onChange={handleCahnge} id="inputPassword" type="password" />
                                                <label>Password</label>
                                            </div>
                                            <div className="form-check mb-3">
                                                {/* <input className="form-check-input" id="inputRememberPassword" type="checkbox" value="" /> */}
                                                <label className="form-check-label" >Remember Password</label>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <NavLink className="small" to="/">Forgot Password?</NavLink>
                                            </div>
                                             <br />
                                            <button disabled={data.isSubmiting} type="submit" className="btn btn-success">
                                                {
                                                    data.isSubmiting ? ("Loading.....") : ("Login")
                                                }
                                            </button>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <div className="small"><a href="register.html">Need an account? Sign up!</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, {signIn})(Login);