import React, { useState, useEffect, useContext } from "react";
import MovieGallery from "../components/MovieGallery";
import { UserContext } from "../utils/contexts";
import { API_URL, TOKEN_NAME } from "../utils/global";
import { postTo } from "../utils/utils";

const Watchlist = () => {

    const {user, setUser} = useContext(UserContext);
    
   
    const [watchList, setWatchlistData] = useState([]);
    const [modalMsg, setModalMsg] = useState("");

    useEffect(async () => {    

        const token = window.localStorage.getItem(TOKEN_NAME);
        
        const resData = await postTo('/watchlist', { token }, true, setUser);

        setWatchlistData(resData);

    }, []);

    const removeFromWatch = async ( { movieId } ) => {
        
        const resData = await postTo('/watchlist/remove', { token: window.localStorage.getItem(TOKEN_NAME), movie_id: movieId}, false, setUser);

        setModalMsg(resData.message);
        
        //Removes the movie from the data stored in state to reflect change without having to reload the page
        setWatchlistData((prevData) => {
            return prevData.filter((item) => item.id != movieId);
        });
        
    }

    return(
        <div className=" w-full pt-12">
            {(Array.isArray(watchList) && watchList.length != 0) ?
            <MovieGallery data={watchList} modalBtnText={"Remove from Watchlist"} modalBtnClickHandler={removeFromWatch} modalMsgText={modalMsg} iconType="red" iconSrc="images/remove-icon.svg"  />
            :
            <p className="absolute top-[45%] left-1/3 md:left-[45%] font-poppins text-sm xs:text-base text-gray-700">Your watchlist is empty</p>
            }
        </div>
        
    );
};

export default Watchlist;