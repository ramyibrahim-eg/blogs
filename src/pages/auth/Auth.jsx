import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const initialialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = ({ setUser }) => {
  const [state, setState] = useState(initialialState);
  const [signUp, setSignUp] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = state;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();

    if (!signUp) {
      if (email && password) {
        toast.success("Success SignIn");
        setDisabled(true);
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        setUser(user);
      } else {
        return toast.error("All fields are mandatory to fill");
      }
    } else {
      if (password !== confirmPassword) {
        return toast.error("password don't match");
      }
      if (firstName && lastName && email && password) {
        toast.success("Success SignUp");
        setDisabled(true);
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(user, { displayName: `${firstName} ${lastName}` });
        setDisabled(true);
      } else {
        return toast.error("All fields are mandatory to fill");
      }
    }
    navigate("/", { replace: true });
  };

  const handleClick = async () => {
    if (!signUp) {
      setDisabled(true);
      await signInWithPopup(auth, provider).then((data) => {
        setSignUp(data.user.email);
        navigate("/", { replace: true });
        toast.success("Success SignIn");
      });
    } else {
      return toast.error("Error SignIn");
    }
  };

  return (
    <div className="container-fluid">
      <div className="contauner">
        <div className="col-12 text-center">
          <div className="text-center heading py-2">
            {!signUp ? "Sign In" : "Sign Up"}
          </div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6 div-form">
            <form className="row" onSubmit={handleAuth}>
              {signUp && (
                <>
                  <div className="col-6 py-3">
                    <input
                      type="text"
                      className="form-control input-text-box"
                      placeholder="First Name"
                      name="firstName"
                      value={firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-6 py-3">
                    <input
                      type="text"
                      className="form-control input-text-box"
                      placeholder="last Name"
                      name="lastName"
                      value={lastName}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
              <div className="col-12 py-3">
                <input
                  type="email"
                  className="form-control input-text-box"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 py-3">
                <input
                  type="password"
                  className="form-control input-text-box"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </div>
              {signUp && (
                <div className="col-12 py-3">
                  <input
                    type="password"
                    className="form-control input-text-box"
                    placeholder="confirm Password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              )}
              <div className="col-12 py-3 text-center">
                <button
                  className={`btn ${!signUp ? "btn-sign-in" : "btn-sign-up"}`}
                  type="submit"
                  disabled={disabled}
                >
                  {!signUp ? "Sign In" : "Sign Up"}
                </button>
              </div>
            </form>
            <div className={`${!signUp ? "col-12 py-3 text-center" : "hide"}`}>
              <button
                className={`${!signUp ? "btn btn-sign-in" : "hide"}`}
                type="submit"
                disabled={disabled}
                onClick={handleClick}
              >
                <FcGoogle /> {`${!signUp ? "Signin" : "Signup"} With Google`}
              </button>
            </div>
            <div>
              {!signUp ? (
                <>
                  <div className="text-center justify-content-center mt-2 pt-2">
                    <p className="small fw-bold mt-2 pt-1 mb-0">
                      Don't have an account!{" "}
                      <span
                        className="link-danger"
                        onClick={() => setSignUp(!signUp)}
                      >
                        SignUp
                      </span>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center justify-content-center mt-2 pt-2">
                    <p className="small fw-bold mt-2 pt-1 mb-0">
                      Already have an account!{" "}
                      <span
                        className="link-danger"
                        onClick={() => setSignUp(!signUp)}
                      >
                        SignIn
                      </span>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
