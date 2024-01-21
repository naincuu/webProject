import React, { useState, useEffect, createContext, useContext } from "react";
import { UserContext } from "../utils/contexts";
import MovieGallery from "./MovieGallery";
import { TOKEN_NAME } from '../utils/global';
import { getFrom, postTo } from "../utils/utils";
import { useNavigate } from "react-router-dom";



const MovieGalleryFecth = () => {

    const [curPage, setCurPage] = useState(1); 
    const [movieData, setMovieData] = useState({}); 
    const [modalMsg, setModalMsg] = useState("");

    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

   
    useEffect(async () => {

        const data = await getFrom(`/movie/all?page=${curPage}`);
        const count = await getFrom(`/movie/count`);
        
       
        setMovieData({data: data, count: count.data.count, totalPages: count.data.totalPages})

    }, []);


    useEffect(async () => {

        const data = await getFrom(`/movie/all?page=${curPage}`);

        setMovieData({...movieData, data: data});

    }, [curPage]);


    const addToWatch = async ({ movieId }) => {
        
        const resData = await postTo('/watchlist/add', { token: window.localStorage.getItem(TOKEN_NAME), movie_id: movieId}, true, setUser);

        if(!user.isLogged){
            navigate('/login');
        }

        setModalMsg(resData.message);
    
    }

    return <MovieGallery data={movieData.data} setCurPage={setCurPage} totalPages={movieData.totalPages} modalBtnText="Add to Watchlist" modalMsgText={modalMsg} modalBtnClickHandler={addToWatch} iconType="green" iconSrc="images/add-icon.svg" />
};

export default MovieGalleryFecth;