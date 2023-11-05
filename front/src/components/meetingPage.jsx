import './meetingPage.scss';
import logoImg from '../images/bridge.png';
import {BsCameraVideoFill,BsFillCameraVideoOffFill, BsFillMicFill, BsFillChatLeftTextFill,BsFillMicMuteFill} from 'react-icons/bs';
import {MdCallEnd} from 'react-icons/md';
import {useState} from 'react';

function MeetPage(){

    const [isChatOpen, setChatOpen] = useState(false);
    const [isMicOpen, setMicOpen] = useState(false);
    const [isCameraOpen, setCameraOpen] = useState(false);
    const [callEnd, setCallEnd] = useState(false);

    const toggleChat = () => {
        console.log(isChatOpen);
        setChatOpen(!isChatOpen);
    }

    const toggleVideo = () => {
        setCameraOpen(!isCameraOpen);
    }

    const toggleMic = () => {
        setMicOpen(!isMicOpen);
    }

    return (
        <div className="meetpageBackground">
            <div className="head-body-functions">
                <div className="head">
                    <div className="logo">
                    <img className="logoImage" src={logoImg} alt="bridge-logo-img"></img>
                    </div>
                    <div className="title">Bridge</div>
                </div>
                <div className="body">
                    <div className="peer1Video"></div>
                    <div className="peer2Video"></div>
                </div>
                <div className="functions">
                    <div className="cameraBtnDiv">
                        <button onClick={toggleVideo} className="cameraBtn">{isCameraOpen ? <BsCameraVideoFill className="cameraIcon"/> : <BsFillCameraVideoOffFill className='cameraIcon'/>}</button>
                    </div>
                    <div className="micBtnDiv">
                        <button onClick={toggleMic} className="micBtn">{isMicOpen ? <BsFillMicFill className="micIcon"/> : <BsFillMicMuteFill className="micIcon"/>}</button>
                    </div>
                    <div className="textBtnDiv">
                        <button onClick={toggleChat} className="textBtn"><BsFillChatLeftTextFill className="textIcon"/></button>
                    </div>
                    <div className="endBtnDiv">
                        <button className="endBtn"><MdCallEnd className="endIcon"></MdCallEnd></button>
                    </div>
                </div>
            </div>
            {isChatOpen && (
                <div className="chatBoxOpen">
                    <div className="chatBoxstyle">
                        <div className="chat-head">회의메세지</div>
                        <div className="chatLine"></div>
                        <div className="chat-message">
                            <div className="user1">
                                <div className="user1-name">user1</div>
                                <div className="user1-message"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {!isChatOpen && (
                <div className="chatBox"></div>
            )}
        </div>
    );
};

export default MeetPage;
