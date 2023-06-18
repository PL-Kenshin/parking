import React from "react";
import { Link } from "react-router-dom";

const LoginForm = ({socket}) => {

    let login = ""

    const loginInput = (e) => {
        login = e.target.value
    }

    let password = ""

    const passInput = (e) => {
        password = e.target.value
    }

    let errorText = React.createRef();

    const handleSubmit = async (event) => {
        event.preventDefault()
        await new Promise(resolve => socket.emit("authenticate",{username:login, password:password}, (response)=> {
            if(response.isAuthenticated){
                localStorage.setItem('token', response.token)
                resolve(window.location.assign("/"))
            }else{
                if(response.isBanned){
                    resolve(window.location.assign("/"))
                    alert('User banned')
                } else{
                    alert('username or password is incorrect')
                }
            }
        }))
    }

    return (
        <div className="containter d-flex justify-content-center">
        <div className="col-md-5 px-3 px-lg-5 py-5 bg-dark mb-5">
            <form className="text-white" onSubmit={handleSubmit}>
                
                <div className="form-floating mb-4 text-dark">
                    <input type="text" id="loginEmail" className="form-control"
                     placeholder="Username" onChange={loginInput} required/>
                    <label className="form-label" htmlFor="loginEmail">Username</label>
                </div>

                
                <div className="form-floating mb-4 text-dark">
                    <input type="password" id="loginPass" className="form-control"
                     placeholder="Password" onChange={passInput} required/>
                    <label className="form-label" htmlFor="loginPass">Password</label>
                    <p className="error text-danger" ref={errorText} hidden>Login lub hasło są niepoprawne</p>
                </div>

                
                <div className="row mb-4">
                    <div className="col d-flex justify-content-center">
                    
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="form2Example31" />
                        <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                    </div>
                    </div>

                    <div className="col">
                    
                    <a href="#!">Forgot password?</a>
                    </div>
                </div>

                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
                </div>
                
                <div className="text-center">
                    <p>Not a member? <Link to="/signup">Register</Link></p>
                    <p>or sign up with:</p>
                    <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fa fa-facebook-f"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fa fa-google"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fa fa-twitter"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fa fa-github"></i>
                    </button>
                </div>
                </form>
        </div>
        </div>
   )
};
export default LoginForm;