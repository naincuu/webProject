import React, { useState, useContext, useRef } from "react";
import { UserContext } from "../utils/contexts";
import { Link, useNavigate } from "react-router-dom";
import { postTo } from "../utils/utils";
import MsgBox from "./MsgBox";

let Signup = () => {

  const { user, setUser} = useContext(UserContext);
  const [validationMsg, setValidationMsg] = useState("");
  const navigate = useNavigate();

  const usernameRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();

  const signupUser = async (userDataforSignup) => {

    
    if(userDataforSignup.confirmPass && userDataforSignup.password){
      if(userDataforSignup.confirmPass === userDataforSignup.password){

        const signupUserData = await postTo('/user/signup', userDataforSignup, true, setUser);

        setValidationMsg(signupUserData.message);
        if(signupUserData.status == 201){
          navigate("/login");
        }

      }else{
        setValidationMsg("First password does not match the second password");
      } 
    }else{
      setValidationMsg("One of the entries is missing");
    }
  };

  return (
    <form className="flex flex-col w-max gap-4 py-4 px-2">
      <h2 className="font-bold text-purple-600 text-center text-2xl xs:text-3xl sm:text-4xl md:text-5xl my-4">
        Signup
      </h2>
      <input
        type="text"
        name="fullname"
        placeholder="Name"
        className="purp_input"
        ref={nameRef}
      />
      <input
        type="text"
        name="username"
        placeholder="Username"
        className="purp_input"
        ref={usernameRef}
      />
      <input
        type="text"
        name="email"
        placeholder="Email"
        className="purp_input"
        ref={emailRef}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        className="purp_input"
        ref={passRef}
      />
      <input
        type="password"
        name="confirm-password"
        placeholder="confirm password"
        className="purp_input"
        ref={confirmPassRef}
      />
      <div className="flex justify-between">
        <button
          type="reset"
          className="purp_outline_btn"
        >
          Reset
        </button>
        <button
          type="submit"
          className="purp_outline_btn"
          onClick={(e) => {e.preventDefault(); signupUser({user_name: usernameRef.current.value, full_name: nameRef.current.value, email: emailRef.current.value, password: passRef.current.value, confirmPass: confirmPassRef.current.value})}}
        >
          Signup
        </button>
      </div>
      {validationMsg ?
        <MsgBox type="error">{validationMsg}</MsgBox>
        :
        null
      }
      <p className="text-sm xs:text-base text-gray-700 mt-2">
        Already have an account !{" "}
        <Link to="/login" className="text-purple-600 font-bold cursor-pointer">Login</Link>
      </p>
    </form>
  );
};

export default Signup;
