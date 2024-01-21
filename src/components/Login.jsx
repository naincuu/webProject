import React, { useContext, useEffect, useRef, useState } from "react";
import { loginUser } from "../utils/utils";
import { TOKEN_NAME } from "../utils/global";
import { Link, useNavigate } from "react-router-dom";
import MsgBox from "./MsgBox";
import { UserContext } from "../utils/contexts";

let Login = (props) => {

  const { user, setUser } = useContext(UserContext);

  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const [ validationMsg, setValidationMsg ] = useState(null);

  const loginClickHandler = async () => {
    try{
      
      const response = await loginUser(usernameRef.current.value, passwordRef.current.value);

      if(response.data){

        window.localStorage.setItem(TOKEN_NAME, response.data.token);
        setUser({token: response.data.token, isLogged: true});
        navigate('/');

      }else{
        setValidationMsg(response.message);
      }
    }catch(err){
      console.log("Error@LoginClickHandler: " + err.message);
      console.error(err);
    }

  }

  return (
    <form className="flex flex-col w-max gap-4 py-4 px-2" onClick={(e) => e.preventDefault()}>
      <h2 className="font-bold text-purple-600 text-center text-2xl xs:text-3xl sm:text-4xl md:text-5xl my-4">
        Login
      </h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        className="purp_input"
        ref={usernameRef}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="purp_input"
        ref={passwordRef}
      />
      
      <button
          type="submit"
          className="purp_outline_btn"
          onClick={loginClickHandler}
        >
          Login
      </button>

      {validationMsg ?
        <MsgBox type="error">{validationMsg}</MsgBox>
        :
        null
      }

      <p className="text-sm xs:text-base text-gray-700 mt-2">
        Don't have an account !{" "}
        <Link to="/signup" className="text-purple-600 font-bold cursor-pointer">Signup</Link>
      </p>
    </form>
  );
};


export default Login;
