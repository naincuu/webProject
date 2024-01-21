import { API_URL, TOKEN_NAME, INVALID_TOKEN_SIGN } from "./global";

export const cutToLength = (str, len) => {
    if(str.length > len){
        return str.substring(0, len) + '...';
    }
    return str;
}

export const loginUser = async (username, pass) => {
    if(username.length > 0 && pass.length > 0){
        const res = await postTo('/user/login', {user_name: username, password: pass});
        return res;
    }
    return {message: 'Username or password is empty'};
}

export const isValidToken = async (token) => {
    if(token){
        const response = await fetch(`${API_URL}/user/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            'body' : JSON.stringify({ token }),
        });

        if(response.status == 200){
            return true;
        }
    }
    return false;
}

export const postTo = async (url, reqBody, returnStatus = false, userStateSetter) => {

    try{
        
        const res = await fetch(`${API_URL}${url}`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reqBody),
        });

        const resStatus = res.status;

        let jsonData = await res.json();
        
        if(returnStatus){
            jsonData.status = resStatus;
        }

        if(reqBody.token && userStateSetter && resStatus == 401){
            removeToken();
            userStateSetter({token: null, isLogged: false});
            return {};
        }

        return jsonData;

    }catch(err){
        console.log("Error@PostTo: " + err.message);
    }
}

//General Method for get Requests
export const getFrom = async (url, returnStatus = false) => {
    const res = await fetch(`${API_URL}${url}`);
    const resStatus = res.status;
    const resData = await res.json();

    if(returnStatus){
        resData.status = resStatus;
    }

    return resData;
}

export const removeToken = () => {
    window.localStorage.removeItem(TOKEN_NAME);
}