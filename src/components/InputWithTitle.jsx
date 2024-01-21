import React from "react";

const InputWithTitle = ({ title, defaultVal, inputRef, holder }) => {
    return(
        <div className="m-2 mb-3">
            <p className="text-sm mb-1">{title}</p>
            <input className="purp_border_input" placeholder={holder} defaultValue={defaultVal} ref={inputRef} />
        </div>
    )
}

export default InputWithTitle;