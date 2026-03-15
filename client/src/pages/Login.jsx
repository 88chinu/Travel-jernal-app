// // client/src/pages/Login.jsx

// import React from "react";
// import Navbar from "../components/Navbar";
// import "../styles/login.css";
// import axios from "axios";
// import {
//     useContext,
//     useState
// } from "react";
// import {
//     useNavigate,
//     Link
// } from "react-router-dom";
// import { AuthContext } from "../authContext";

// function Login() {
//     const [credentials, setCredentials] = useState({
//         username: undefined,
//         password: undefined,
//     });

//     const { dispatch } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setCredentials((prev) => ({
//             ...prev,
//             [e.target.id]: e.target.value
//         }));
//     };

//     const handleClick = async (e) => {
//         e.preventDefault();
//         dispatch({ type: "LOGIN_START" });
//         try {
//             const res = await axios.post("http://localhost:5500/api/users/login",
//                 credentials);
//             dispatch({
//                 type: "LOGIN_SUCCESS",
//                 payload: res.data.details
//             });
//             navigate('/');
//         } catch (err) {
//             if (err.response && err.response.data) {
//                 /*
//                 If error response and data exist, 
//                 dispatch LOGIN_FAILURE with error message
//                 */
//                 dispatch({
//                     type: "LOGIN_FAILURE",
//                     payload: err.response.data
//                 });
//             } else {
//                 /*
//                  If no error response or data,
//                  dispatch generic error message
//                 */
//                 dispatch({
//                     type: "LOGIN_FAILURE",
//                     payload: "An error occurred while logging in"
//                 });
//             }
//         }
//     };


//     return (
//         <div className="login">
//             <Navbar />
//             <div className="loginCard">
//                 <div className="center">
//                     <h1>Welcome Back!</h1>
//                     <form>
//                         <div className="txt_field">
//                             <input
//                                 type="text"
//                                 placeholder="username"
//                                 id="username"
//                                 onChange={handleChange}
//                                 className="lInput"
//                             />
//                         </div>
//                         <div className="txt_field">
//                             <input
//                                 type="password"
//                                 placeholder="password"
//                                 id="password"
//                                 onChange={handleChange}
//                                 className="lInput"
//                             />
//                         </div>
//                         <div className="login_button">
//                             <button className="button"
//                                 onClick={handleClick}>
//                                 Login
//                             </button>
//                         </div>
//                         <div className="signup_link">
//                             <p>
//                                 Not registered?
//                                 <Link to="/register">Register</Link>
//                             </p>
//                         </div>
//                     </form>

//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Login;

import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../authContext";
import Navbar from "../components/Navebar";

export default function Login(){

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const {dispatch} = useContext(AuthContext);

  const handleLogin = async (e)=>{
    e.preventDefault();

    dispatch({type:"LOGIN_START"});

    try{
      const res = await axios.post("/api/users/login",{
        username,
        password
      });

      dispatch({type:"LOGIN_SUCCESS",payload:res.data});

    }catch(err){
      dispatch({type:"LOGIN_FAILURE",payload:err});
    }
  }

  return(
    <>
      <Navbar/>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="username"
          onChange={(e)=>setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button>Login</button>
      </form>
    </>
  )
}