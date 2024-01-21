import React, { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";
import PageBar from "./PageBar";
import MovieModal from "./MovieModal";
import { render } from "react-dom";



const MovieGallery = ({data, setCurPage, totalPages, modalBtnText, modalBtnClickHandler, modalMsgText, iconType, iconSrc}) => {

    const [movieModalData, setMovieModalData] = useState(null);
    const mContainerRef = useRef();//Ref To Help Scroll To Top

    const updateCount = useRef(0);

  


    useEffect(() => {   
       
        if(updateCount.current > 1){
            mContainerRef.current.scrollIntoView({ behavior: 'smooth' });
        }

        

        
        if(!Array.isArray(data)){
            data = [];
        }else{
            updateCount.current += 1;
        }

    }, [data]);

    return (
        <section id="movies-cont" className="py-4 px-2" ref={mContainerRef}>
            {}
            {movieModalData ? <MovieModal exitAction={() => setMovieModalData(null)} modalMovData={movieModalData} btnText={modalBtnText} btnClickHandler={modalBtnClickHandler} msgText={modalMsgText} /> : null}
            
            {}
            <div className="container grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 justify-items-center gap-3 p-1 xs:p-4">
                {data ? data.map((rawData, i) => <MovieCard key={i} iconClickHandler={modalBtnClickHandler} iconSrc={iconSrc} iconType={iconType} rawData={rawData} clickHandler={() => setMovieModalData(rawData)} />) : <div className="spinner absolute bottom-0"></div> /* Play around spinner so it fits perfectly on both home and wishlist */ }
            </div>

            {}
            {totalPages ? (totalPages > 1 ?
            <PageBar setCurPage={setCurPage} totalPages={totalPages} /> : null) 
            : null}

        </section>
    )
    
}

export default MovieGallery;