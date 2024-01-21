import React from "react";

const SmallIcon = ({clickHandler, iconSrc, type = "green"}) => {

    const element = type == "green" ? <img onClick={clickHandler} className='bg-green-400 hover:bg-green-500 active:bg-green-600 rounded-sm p-1 m-1 right-0 w-7  absolute' src={iconSrc} />
                            : <img onClick={clickHandler} className='bg-red-600 hover:bg-red-700 active:bg-red-900 rounded-sm p-1 m-1 right-0 w-7 absolute' src={iconSrc} />

    return element;
};

export default SmallIcon;