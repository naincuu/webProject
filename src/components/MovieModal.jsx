import React, {useState, useEffect} from 'react';
import { API_URL } from '../utils/global';
import { getFrom } from "../utils/utils"
import MsgBox from './MsgBox';



const MovieModal = ({modalMovData, exitAction, btnClickHandler, btnText, msgText}) => {

    const [modalData, setModalData] = useState(null);
    
    useEffect( async () => {

        const resData = await getFrom(`/movie/tmdb?link=${modalMovData.url}`);
      
        resData.launch_date = modalMovData.launch_date;
        resData.movieId = modalMovData.id;
        resData.rating = modalMovData.rating;
        resData.img_url = modalMovData.img_url;
        resData.name = modalMovData.name;
        resData.movieId = modalMovData.id;
        
        setModalData(resData);

    }, [])

    if(!modalData){
        return (
            <div className="w-full h-full fixed top-0 left-0 z-50 bg-[#00000011] flex justify-center items-center py-2" onClick={(e) => {e.target === e.currentTarget ? exitAction(null) : false}}>
                <div className="spinner"></div>
            </div>
        )
    }

    return(
        <div className="w-full h-full fixed top-0 left-0 z-50 bg-[#00000021] flex justify-center items-center py-2" onClick={(e) => {e.target === e.currentTarget ? exitAction(null) : false}}>
            <div className="relative bg-white border-2 border-purple-700 w-11/12 max-w-4xl px-6 py-4 md:py-6 rounded container">
                <img src="images/close.svg" className="w-4 h-4 absolute top-4 right-4 cursor-pointer" onClick={() => exitAction(null)} />
                <div className="h-full md:flex gap-4 justify-center items-center">
                    <img src={modalData.img_url} className="rounded shadow-lg md:shadow-none h-40 xs:h-60  md:h-96 w-auto mx-auto md:mx-0" />
                    <div className="py-3 xs:px-8 font-poppins text-center sm:text-left">
                        <h2 className="font-bold text-md xs:text-lg text-gray-800 md:text-4xl inline">{modalData.name}</h2>
                        <p className="text-gray-400 pt-2 text-sm sm:text-lg">{modalData.tagline}</p>
                        <p className="text-gray-800 text-sm sm:text-lg my-2 max-h-44 md:max-h-50 overflow-y-auto">{modalData.disc}</p>
                        <p className="font-bold text-sm xs:text-base">Rating: {modalData.rating}%</p>
                        <p className="text-gray-400 text-sm xs:text-base">{modalData.genre}</p>
                        <p className="text-gray-400 text-sm xs:text-base">{modalData.launch_date}</p>
                        <button onClick={() => btnClickHandler(modalData)} className="p-2 mt-2 border cursor-pointer text-sm xs:text-base border-purple-600 rounded text-purple-700 hover:bg-purple-600 hover:text-white active:bg-purple-700">{btnText}</button>
                        <MsgBox>{msgText}</MsgBox>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieModal;