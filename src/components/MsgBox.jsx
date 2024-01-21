import React from "react";

const MsgBox = ({children, type}) => {
    
    let blockColor = "";
    
    if(type == "error"){
        blockColor = "bg-red-100"
    }else if(type == "neutral"){
        blockColor = "bg-gray-100";
    }else if(type == "success"){
        blockColor = "bg-green-100";
    }

    return(
    <p className={`${blockColor} text-center mx-auto my-0 py-2 px-1 text-gray-800 rounded text-xs xs:text-sm md:text-base max-w-[fit-content]`} >
        {children}
    </p>
    )
}

export default MsgBox;