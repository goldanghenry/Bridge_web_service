import './loginPage.scss';
import React from 'react';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../images/bridge.png';

function LoginPage(){
    // id, password 정의
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const realId = "sjeong35";
    const realPw = "sj961441!";

    const Navigate = useNavigate();

    const goToMain = () => {
        Navigate('/mainPage');
    }


    return (
        <div className="background">
            <div className="Components">
                <div className="logo">
                    <img className="logoImage" src={logoImg} alt="bridge-logo-img"></img>
                </div>
                <div className="title">Bridge</div>
                <div className="idComponent">
                <input id="id" className="idInput" placeholder="아이디를 입력하세요." onChange={e =>{setId(e.target.value);}}></input>
                </div>
                <div className="pwComponent">
                    <input id="pw" className="pwInput" placeholder="비밀번호를 입력하세요." onChange={e=>{setPassword(e.target.value);}} ></input>
                </div>
                <div className="cbComponent">
                    <div className="cb1Div">
                        <input className="cb" type="checkbox" name="saveId" value="saveId"></input>
                        <div className="cbtext">아이디 저장</div>
                    </div>
                    <div className="cb2Div">
                        <input className="cb" type="checkbox" name="autoLogin" value="autoLogin"></input>
                        <div className="cbtext">자동 로그인</div>
                    </div>
                </div>
                {/*<div className="cbComponent">
                    <div className="questionText">나는 청각장애인이다</div>
                    <div className="cbDiv">
                        <text>Yes</text>
                        <input className="cb" type="checkbox" name="deaf" value="yes"></input>
                        <text>No</text>
                        <input className="cb" type="checkbox" name="deaf" value="no"></input>
                    </div>
                </div>*/}
                <div className="buttonComponent">
                    <button type="button" className="loginButton" onClick={e=>{
                        if(realId === id && realPw === password){
                            e.stopPropagation();
                            goToMain();
                        }
                        else{
                            alert('아이디 또는 비밀번호가 일치하지 않습니다.'); 
                        }
                    }}>로그인</button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;