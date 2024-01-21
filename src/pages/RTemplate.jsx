import React from "react";
import Navbar from "../components/Navbar"
import Login from "../components/Login";
import Signup from "../components/Signup";


let RTemplate = (props) => {

    return (
        <section className="font-poppins container h-full flex items-center justify-between">
            <div className="flex-grow sm:flex-grow-0 sm:w-9/12 flex justify-center">
                {props.children}
            </div>
            <div className="hidden sm:block absolute right-0 bg-purple-600 h-full w-3/12">
                <img src="images/side-asset.png" className="h-full w-full object-cover"></img>
            </div>
        </section>
    )
}

export default RTemplate;