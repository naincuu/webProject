import React, { useEffect, useRef, useState } from "react";

let PageBar = ({maximiumPages, minimumItems, items, setItems}) => {

    const btnArray = [];
    let totalPages = maximiumPages;
    let itemsPerPage = minimumItems;
    let itemsLen = items.length;
    let itemsTD = []; //Items to display
    const [currentPage, setCurrentPage] = useState(1);
    const pageBtnsRef = useRef();
    
    //does necessary initialization of components
    useEffect(() => {
        if(itemsLen/totalPages >= itemsPerPage){
            itemsPerPage = parseInt(itemsLen/totalPages);
        }else{
            totalPages = parseInt(itemsLen/itemsPerPage);
        }
    }, [])

    //Decides Which Items To Display On Pages
    useEffect(() => {
        //Set To Empty Array
        itemsTD = [];

        //Choose The Right Elements Accourding To Current Page
        for(let i = ((currentPage-1)*(itemsPerPage)); i < (currentPage*itemsPerPage); i++){
            itemsTD.push(items[i]);
        }
        
        //Highlight the selected page btn
        Array.from(pageBtnsRef.current.children).forEach((el, i) => {
            if(currentPage === i+1){
                el.classList.add('pagebar_btn_active');
            }else{
                el.classList.remove('pagebar_btn_active');
            }
        })

        //Set Items To Newly Selected Items
        setItems(itemsTD);
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