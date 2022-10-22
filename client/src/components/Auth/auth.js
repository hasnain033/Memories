import React, { useState } from "react";
import authCSS from "./auth.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decode from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../action/auth";

// import Icon from "./icon";

const initialformData = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmpassword: "",
};

const Auth = () => {
  const [isSignup, setisSignup] = useState(false);
  const [formData, setformData] = useState(initialformData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (isSignup) {
      console.log("heelo");
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const switchMode = () => {
    setisSignup((isSignup) => !isSignup);
  };

  const onSuccess = async (res) => {
    const result = jwt_decode(res.credential);
    console.log(result);
    const { name, picture, sub } = result;
    const data = {
      result: {
        _id: sub,
        name: name,
        _type: "user",
        image: picture,
      },
    };
    try {
      dispatch({ type: "AUTH", payload: data });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // const handlecallback = (response) => {
  //   console.log(response.credential);
  // };

  // useEffect(() => {
  //   google.accounts.id.initialize({
  //     client_id:
  //       "534099839548-3nllojbb7lfkmfdel9scmgpgblu8cfbv.apps.googleusercontent.com",
  //     callback: handlecallback,
  //   });

  //   google.accounts.id.renderButton(document.getElementById("login"), {
  //     theme: "outline",
  //     size: "large",
  //   });
  // });

  // const googleSuccess = async (res) => {
  //   console.log("Google Sign In successed");
  // };

  // const googleFailure = (error) => {
  //   console.log(error);
  //   console.log("Google Sign In failed");
  // };

  return (
    <div className={authCSS.Authcontainer}>
      <div className={authCSS.Authform}>
        <div className={authCSS.Authcontent}>
          <h3 className={authCSS.Authtitle}>
            {isSignup ? "Sign Up" : "Sign In"}
          </h3>
          {/* <div className="text-center">
            Already registered? <span className="link-primary">Sign In</span>
          </div> */}
          {isSignup && (
            <>
              <div className="form-group mt-3">
                <label>First Name</label>
                <input
                  name="firstname"
                  type="text"
                  className="form-control mt-1"
                  placeholder="e.g Jane"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Last Name</label>
                <input
                  name="lastname"
                  type="text"
                  className="form-control mt-1"
                  placeholder="e.g Doe"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </>
          )}
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              name="email"
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              name="password"
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              onChange={(e) => handleChange(e)}
            />
          </div>
          {isSignup && (
            <div className="form-group mt-3">
              <label>Confirm Password</label>
              <input
                name="confirmpassword"
                type="password"
                className="form-control mt-1"
                placeholder="Password"
                onChange={(e) => handleChange(e)}
              />
            </div>
          )}

          <div className={`mt-3 ${authCSS.googlebtn}`}>
            <GoogleLogin
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  This is my custom Google button
                </button>
              )}
              buttonText="Login"
              onSuccess={(res) => onSuccess(res)}
              onError={() => console.log("error")}
            ></GoogleLogin>
          </div>

          <div className="d-grid gap-2 mt-3">
            <button onClick={handleSubmit} className="btn btn-primary">
              {isSignup ? "Sign Up" : "Sign In"}
            </button>
          </div>
          <div className="d-grid gap-2 mt-3">
            <button onClick={switchMode} className="btn btn-secondary">
              {isSignup
                ? "Already have a account? Sign In"
                : "Don't have a account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
