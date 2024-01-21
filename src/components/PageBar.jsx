import React, { useEffect, useRef, useState } from "react";


let PageBar = ({setCurPage, totalPages}) => {

    const btnArray = []; //Contains the buttons for total pages
    const [currentPage, setCurrentPage] = useState(1);
    const pageBtnsRef = useRef();

    useEffect(() => {

        
        Array.from(pageBtnsRef.current.children).forEach((el, i) => {
            if(currentPage === i+1){
                el.classList.add('pagebar_btn_active');
            }else{
                el.classList.remove('pagebar_btn_active');
            }
        });

        setCurPage(currentPage);

    }, [currentPage]);

    const btnClickHandler = (e) => {
        setCurrentPage(parseInt(e.target.innerText));
    }

    const nextClickHandler = () => {
        setCurrentPage((prev) => {
            if(prev < totalPages){
                return prev+1;
            }else{
                return prev;
            }
        });
    }

    const prevClickHandler = () => {
        setCurrentPage((prev) => {
            if(prev > 1){
                return prev-1;
            }else{
                return prev;
            }
        });
    }

    //Add Buttons For Pages
    for(let i = 1; i <= totalPages; i++){
        btnArray.push(<button key={i} className="pg_btn border-r w-12" onClick={btnClickHandler}>{i}</button>);
    }

    return(
       <div className="bg-white text-gray-700 font-poppins mx-auto my-4 flex justify-center w-max border border-gray-300 rounded-lg shadow-lg overflow-hidden">
            <button className="pg_btn border-r w-22 rounded-l-lg" onClick={prevClickHandler}>Prev</button>
            
            <div className="hidden xs:block" ref={pageBtnsRef}>
                {btnArray}
            </div>
            
            <button className="pg_btn w-22 rounded-r-lg" onClick={nextClickHandler}>Next</button>
       </div>
    )
}

export default PageBar;