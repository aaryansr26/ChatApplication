import React from "react";
import './Infobar.css'

import onlineIcon from '../icons/closeIcon.png'
import closeIcon from '../icons/onlineIcon'

const Infobar = () => {
    <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onlineIcon" src={onlineIcon} alt="onlineIcon"/>
            <h3>roomName</h3>
        </div>
        <div className="rightInnerContainer">
        <a href="/"><img src={closeIcon} alt="closeImage" /></a>
        </div>
    </div>

}

export default Infobar;  