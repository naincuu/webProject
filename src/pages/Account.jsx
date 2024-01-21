import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputWithTitle from "../components/InputWithTitle";
import MsgBox from "../components/MsgBox";
import { UserContext } from "../utils/contexts";
import { TOKEN_NAME } from "../utils/global";
import { postTo, removeToken } from "../utils/utils";

const Account = () => {
  const { user, setUser } = useContext(UserContext);
  const [validationMsg, setValidationMsg] = useState("Nothing to Update");
  const [userData, setUserData] = useState({});

  const nameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
 
  useEffect(async () => {
 
    const accessToken = window.localStorage.getItem(TOKEN_NAME);

    //get user info from server to show their user
    const resData = await postTo(
      "/user/login",
      { token: accessToken },
      true,
      setUser
    );

    //If error only then show message
    if (resData.status < 200 && resData.status > 300) {
      setValidationMsg(resData.message);
    }else{
        setUserData(resData.data);
    }
    
    

    if (resData.data) {
      nameRef.current.value = resData.data.full_name;
      usernameRef.current.value = resData.data.user_name;
      emailRef.current.value = resData.data.email;
      //passRef.current.value = data.password; //server doesn't send password back
    }
  }, []);

  //TODO check if below function works
  const updateClickHandler = async ({ user_name, full_name, email }) => {
    
    let dataToSend = {
        token: window.localStorage.getItem(TOKEN_NAME)
    };

    if (user_name != userData.user_name) {
      dataToSend.user_name = user_name;
      //console.log(user_name + " " + userData.user_name);
    }

    if (full_name != userData.full_name) {
      dataToSend.full_name = full_name;
      //console.log(full_name + " " + userData.full_name);
    }

    if (email != userData.email) {
      dataToSend.email = email;
      //console.log(email + " " + userData.email);
    }

    const resData = await postTo("/user/update", dataToSend, false, setUser);
    
    setValidationMsg(
        resData.message
    );

  };

  const navigate = useNavigate();

  const logoutUser = () => {
    removeToken();
    setUser({token: null, isLogged: false});
    navigate('/');
  }

  return (
    <section className="w-full h-full flex justify-center items-center">
      <div className="p-2 font-poppins w-3/4  xs:w-2/3 sm:w-96">
        <h1 className="text-center text-2xl xs:text-3xl md:text-4xl mt-2 mb-5 font-bold text-purple-600">
          Account
        </h1>
        <InputWithTitle title="Full Name" inputRef={nameRef} />
        <InputWithTitle title="Username" inputRef={usernameRef} />
        <InputWithTitle title="Email" inputRef={emailRef} />
        {/* can't show password <InputWithTitle title="Password" holder="Enter New Password" inputRef={passRef} />*/}
        <MsgBox>{validationMsg}</MsgBox>
        <div className="flex justify-between px-2">
          <button className="purp_outline_btn" onClick={logoutUser}>Logout</button>
          <button
            className="purp_outline_btn"
            onClick={() => updateClickHandler({ user_name: usernameRef.current.value, full_name: nameRef.current.value, email: emailRef.current.value })}
          >
            Update
          </button>
        </div>
      </div>
    </section>
  );
};

export default Account;
