import './meetingPage.scss';
import logoImg from '../images/bridge.png';
import {BsFillCameraFill, BsFillMicFill, BsFillChatLeftTextFill} from 'react-icons/bs';
import {MdCallEnd} from 'react-icons/md';
import {useState} from 'react';

function MeetPage(){

    const [isChatOpen, setChatOpen] = useState(false);

    const toggleChat = () => {
        setChatOpen(!isChatOpen);
        alert(`버튼 눌렸다. ${isChatOpen}`);
    };

    return (
        <div className="meetpageBackground">
            <div className="head">
                <div className="logo">
                <img className="logoImage" src={logoImg} alt="bridge-logo-img"></img>
                </div>
                <div className="title">Bridge</div>
            </div>
            <div className="body">
                <div className="peer1Video"></div>
                <div className="peer2Video"></div>
                <div className={isChatOpen ? 'chatBoxOpen' : 'chatBox'}></div>
            </div>
            <div className="functions">
                <div className="cameraBtnDiv">
                    <button className="cameraBtn"><BsFillCameraFill className="cameraIcon"/></button>
                </div>
                <div className="micBtnDiv">
                    <button className="micBtn"><BsFillMicFill className="micIcon"/></button>
                </div>
                <div className="textBtnDiv">
                    <button onClick={toggleChat} className="textBtn"><BsFillChatLeftTextFill className="textIcon"></BsFillChatLeftTextFill>/</button>
                </div>
                <div className="endBtnDiv">
                    <button className="endBtn"><MdCallEnd className="endIcon"></MdCallEnd></button>
                </div>
                
            </div>
        </div>
    );
};

export default MeetPage;
