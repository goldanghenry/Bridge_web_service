import './waitPage.scss';
import React from 'react';
import logoImg from '../images/bridge.png';

function waitPage(){
    return(
        <div className="pageBackground">
            <div className="head">
                <div className="logo">
                <img className="logoImage" src={logoImg} alt="bridge-logo-img"></img>
                </div>
                <div className="title">Bridge</div>
            </div>
            <div className="body">
                <div className="videoSpot"></div>
                <div className="textButtonSpot">
                    <div className="text">회의에 참가하시겠습니까 ?</div>
                    <div className="joinButtonDiv">
                    <button className="joinButton" type="button">회의참가</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default waitPage;