import React, { useState } from "react";
import SmallIcon from "./SmallIcon";

let MovieCard = ({clickHandler, iconClickHandler, rawData, iconType, iconSrc}) => {

    return (    
       <div className="w-32 xs:w-36 sm:w-40 lg:w-44 my-1 cursor-pointer relative">
            <button onClick={() => iconClickHandler({movieId: rawData.id})}><SmallIcon type={iconType} iconSrc={iconSrc} /></button>
            <img src={rawData.img_url} className="w-full h-auto rounded mx-auto shadow-lg cursor-pointer" onClick={clickHandler} />     
            <h3 className="font-poppins font-normal text-center text-gray-800 text-sm xs:text-base lg:text-lg mt-3">{rawData.name}</h3>
        </div>
    )
}

export default MovieCard;