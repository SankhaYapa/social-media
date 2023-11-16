import axios from "axios";
import { useContext, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material"; // Assuming you are using Material-UI
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { isFetching, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const email = useRef(null);
  const password = useRef(null);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const [errorr, setError] = useState(null);

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:8800/api/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    }  catch (err) {
      console.log(err.response.data); // Log the response from the server
      setError("Invalid username or password. Please try again.");
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  
  return (
    <div className="login">
      <div
        className="loginWrapper"
        style={{
          backgroundImage: `url(${PF + "background2.jpg"})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="loginLeft">
          <form className="loginBox" onSubmit={handleClick}>
            <span className="SignInName">Sign In Now.</span>
            <span className="details">Enter your details below.</span>
            <input
              placeholder="Username"
              type="text"
              required
              className="loginInput"
              onChange={handleChange}
              id="username"
            
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              onChange={handleChange}
              id="password"
           
            />
           {errorr && <span className="loginError">{errorr}</span>}

            <button className="loginButton" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="secondary" size="20px" />
              ) : (
                "Sign In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <div className="loginRegister">
              <span className="notamem">Not a member?</span>
              <Link to={"/register"}>
                <button className="loginRegisterButton">
                  {isFetching ? (
                    <CircularProgress color="secondary" size="20px" />
                  ) : (
                    "Create a New Account"
                  )}
                </button>
              </Link>
            </div>
            <div className="Logodiv">
              <img src={PF + "/logo.png"} alt="" className="LogoImg" />
              <div className="LogoName">
                <span className="loginLogo">SL GUIDER</span>
                <span className="details">
                  Share Your Traveling Idea With Friends
                </span>
              </div>
            </div>
          </form>
        </div>
        <div className="loginRight">
          {/* <h3 className="loginLogo">SL GUIDER</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
